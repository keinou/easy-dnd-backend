// src/character/character.service.ts
import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { validate } from 'class-validator';
import { Model } from 'mongoose';
import { Inventory } from '../inventory/entities/inventory.entity';
import { Budget, Character } from './entities/character.entity';

@Injectable()
export class CharacterService {
  constructor(
    @InjectModel(Character.name) private characterModel: Model<Character>,
    @InjectModel(Inventory.name) private inventoryModel: Model<Inventory>,
  ) { }

  async create(characterData: Character, ownerId: string): Promise<Character> {
    const existingCharacter = await this.characterModel.findOne({
      _owner: ownerId,
      name: characterData.name,
    });

    if (existingCharacter) {
      throw new BadRequestException('A character with the same name already exists for this owner');
    }

    const character = new Character();
    character.name = characterData.name;
    character.class = characterData.class;
    character.race = characterData.race;
    character.level = characterData.level;
    character.budget = characterData.budget;
    character._owner = ownerId;

    const errors = await validate(character);
    if (errors.length > 0) {
      throw new BadRequestException(errors);
    }
    const db = new this.characterModel(character);

    const inventory = new Inventory();
    inventory._owner = ownerId;
    inventory._character = db._id;
    const dbInventory = new this.inventoryModel(inventory);
    dbInventory.save();

    db._inventory = dbInventory._id;

    return db.save();
  }

  async findAll(ownerId: string): Promise<Character[]> {
    return this.characterModel.find({ _owner: ownerId }).exec();
  }

  async findOne(ownerId: string, id: string): Promise<Character> {
    const character = await this.characterModel.findById(id);

    if (!character)
      throw new NotFoundException();

    if (character._owner.toString() !== ownerId)
      throw new ForbiddenException();

    return character
  }

  async findOneBudget(ownerId: string, id: string): Promise<Budget> {
    const character = await this.characterModel.findById(id);

    if (!character)
      throw new NotFoundException();

    if (character._owner.toString() !== ownerId)
      throw new ForbiddenException();

    return character.budget
  }

  async update(ownerId: string, id: string, characterData: Character): Promise<Character> {
    const character = await this.characterModel.findById(id, { _owner: ownerId }).exec();

    if (!character)
      throw new ForbiddenException();

    return this.characterModel.findByIdAndUpdate(id, characterData, { new: true });
  }

  async remove(ownerId: string, id: string): Promise<Character> {
    const character = this.characterModel.findById(id, { _owner: ownerId }).exec();

    if (!character)
      throw new ForbiddenException();

    return this.characterModel.findByIdAndRemove(id);
  }
}
