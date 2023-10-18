// src/character/character.service.ts
import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Character } from './entities/character.entity';

@Injectable()
export class CharacterService {
  constructor(
    @InjectModel(Character.name) private characterModel: Model<Character>,
  ) { }

  async create(characterData: Character, ownerId: string): Promise<Character> {
    const character = new this.characterModel(characterData);
    character.ownerId = ownerId;
    return character.save();
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
