import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CharacterService } from '../character/character.service';
import { Inventory, InventoryItem } from './entities/inventory.entity';

@Injectable()
export class InventoryService {
  constructor(
    private readonly characterService: CharacterService,
    @InjectModel(Inventory.name) private inventoryModel: Model<Inventory>,
  ) { }

  async getInventory(characterId: string, ownerId: string) {
    const character = await this.characterService.findOne(ownerId, characterId);
    return this.inventoryModel.findById(character._inventory);
  }

  async addInventoryItem(characterId: string, ownerId: string, item: InventoryItem) {
    const character = await this.characterService.findOne(ownerId, characterId);
    return this.inventoryModel.findById(character._inventory);
  }

}
