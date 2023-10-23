import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { validate } from 'class-validator';
import { Model } from 'mongoose';
import { CharacterService } from 'src/character/character.service';
import { Campaign } from './entities/campaign.entity';

@Injectable()
export class CampaignService {
  constructor(
    private readonly characterService: CharacterService,
    @InjectModel(Campaign.name) private campaignModel: Model<Campaign>,
  ) { }

  async create(campaignData: Campaign, ownerId: string) {
    const existingCampaign = await this.campaignModel.findOne({
      _owner: ownerId,
      name: campaignData.name,
    });

    if (existingCampaign) {
      throw new BadRequestException('A campaign with the same name already exists for this owner');
    }

    const campaign = new Campaign();
    campaign.name = campaignData.name;
    campaign.description = campaignData.description;
    campaign._owner = ownerId;
    campaign._characters = [];

    const errors = await validate(campaign);
    if (errors.length > 0) {
      throw new BadRequestException(errors);
    }

    const dbCampaign = new this.campaignModel(campaign);
    return dbCampaign.save();
  }

  async findAll(userId: string): Promise<Campaign[]> {
    const myCharacters = await this.characterService.findAll(userId);
    return this.campaignModel.find({
      $or: [
        { _owner: userId },
        { _characters: myCharacters },
      ]
    }).exec();
  }

  async findOne(userId: string, id: string) {
    const campaign = await this.campaignModel.findById(id);
    const myCharacters = await this.characterService.findAll(userId);

    if (!campaign)
      throw new NotFoundException();

    if (campaign._owner.toString() !== userId) {
      const hasAccess = myCharacters.some(character => campaign._characters.includes(character._id.toString()));
      if (!hasAccess)
        throw new ForbiddenException();
    }

    return campaign
  }

  async update(ownerId: string, id: string, campaignData: Campaign) {
    const campaign = await this.campaignModel.findById(id, { _owner: ownerId }).exec();

    if (!campaign)
      throw new ForbiddenException();

    return this.campaignModel.findByIdAndUpdate(id, campaignData, { new: true });
  }

  async remove(ownerId: string, id: string) {
    const campaign = await this.campaignModel.findById(id, { _owner: ownerId }).exec();

    if (!campaign)
      throw new ForbiddenException();

    return this.campaignModel.findByIdAndRemove(id);
  }
}
