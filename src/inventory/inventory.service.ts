import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Item } from 'src/items/entities/item.entity';
import { ItemsService } from 'src/items/items.service';
import { CharacterService } from '../character/character.service';
import { Inventory, InventoryItem } from './entities/inventory.entity';

@Injectable()
export class InventoryService {
  constructor(
    private readonly characterService: CharacterService,
    private readonly itemService: ItemsService,
    @InjectModel(Inventory.name) private inventoryModel: Model<Inventory>,
  ) { }

  async getInventory(characterId: string, ownerId: string) {
    const character = await this.characterService.findOne(ownerId, characterId);
    return this.inventoryModel.findById(character._inventory);
  }

  async updateInventory(inventory: Inventory) {
    return await this.inventoryModel.findByIdAndUpdate(inventory._id, inventory);
  }

  async addInventoryItem(characterId: string, ownerId: string, item: InventoryItem) {
    let checkItem: Item;
    try {
      checkItem = (await this.itemService.findOne(item.item)).toObject();
    } catch (error) {
      throw new BadRequestException("Item with id '" + item.item + "' does not exists!");
    }

    const inventory = (await this.getInventory(characterId, ownerId)).toObject();

    let itemExists = false;
    for (const invItem of inventory.items as any[]) {
      if (invItem.item === checkItem._id.toString()) {
        invItem.quantity += item.quantity;
        itemExists = true;
        break;
      }
    }

    if (!itemExists) {
      (inventory.items as any[]).push(item);
    }

    await this.updateInventory(inventory);

    return inventory;
  }

  async removeInventoryItem(characterId: string, ownerId: string, item: InventoryItem) {
    let checkItem: Item;
    try {
      checkItem = (await this.itemService.findOne(item.item)).toObject();
    } catch (error) {
      throw new BadRequestException("Item with id '" + item.item + "' does not exists!");
    }

    const inventory = await this.getInventory(characterId, ownerId);

    let itemExists = false;
    for (let i = 0; i < inventory.items.length; i++) {
      const invItem = inventory.items[i] as any;

      if (invItem.item === checkItem._id.toString()) {

        if (invItem.quantity < item.quantity)
          throw new BadRequestException('You have only ' + invItem.quantity + " '" + checkItem.name + "(s)' in inventory.");

        invItem.quantity -= item.quantity;
        itemExists = true;

        if (invItem.quantity <= 0) {
          inventory.items.splice(i, 1);
        }

        break;
      }
    }

    if (!itemExists) {
      throw new BadRequestException("You dont have a '" + checkItem.name + "' in inventory!");
    }

    await this.updateInventory(inventory);

    return inventory;
  }

}
