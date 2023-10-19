// src/character/character.service.ts
import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { validate } from 'class-validator';
import { Model } from 'mongoose';
import { Character } from './entities/character.entity';

@Injectable()
export class CharacterService {
  constructor(
    @InjectModel(Character.name) private characterModel: Model<Character>,
  ) { }

  async create(characterData: Character, ownerId: string): Promise<Character> {
    const character = new Character();
    character.ownerId = ownerId;
    character.name = characterData.name;
    character.class = characterData.class;
    character.race = characterData.race;
    character.level = characterData.level;
    character.budget = characterData.budget;

    const errors = await validate(character);
    if (errors.length > 0) {
      throw new BadRequestException(errors);
    }

    const db = new this.characterModel(character);

    return db.save();
  }

  async findAll(ownerId: string): Promise<Character[]> {
    return this.characterModel.find({ ownerId: ownerId }).exec();
  }

  async findOne(ownerId: string, id: string): Promise<Character> {
    const character = this.characterModel.findById(id, { ownerId: ownerId }).exec();

    if (!character)
      throw new NotFoundException();

    return character
  }

  async findOneBudget(ownerId: string, id: string): Promise<Character> {
    const character = this.characterModel.findById(id, { ownerId: ownerId }, { fields: 'budget' }).exec();

    if (!character)
      throw new NotFoundException();

    return character
  }

  async update(ownerId: string, id: string, characterData: Character): Promise<Character> {
    const character = this.characterModel.findById(id, { ownerId: ownerId }).exec();

    if (!character)
      throw new ForbiddenException();

    return this.characterModel.findByIdAndUpdate(id, characterData, { new: true });
  }

  async remove(ownerId: string, id: string): Promise<Character> {
    const character = this.characterModel.findById(id, { ownerId: ownerId }).exec();

    if (!character)
      throw new ForbiddenException();

    return this.characterModel.findByIdAndRemove(id);
  }
}
