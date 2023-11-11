import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel } from 'mongoose';
import { Item } from './entities/item.entity';

@Injectable()
export class ItemsService {
  constructor(@InjectModel(Item.name) private itemModel: PaginateModel<Item>) {}

  async findAll(page: number, pageSize: number, filter: string) {
    const query = {};

    if (filter) {
      query['name'] = { $regex: new RegExp(filter, 'i') };
    }

    const response = await this.itemModel.paginate(query, {
      page: page,
      limit: pageSize,
    });

    return response;
  }

  findOne(id: string) {
    return this.itemModel.findById(id);
  }

  async changedWeight() {
    const itens = await this.itemModel.find();

    for (let i = 0; i < itens.length; i++) {
      if (itens[i].strweight != null) {
        if (itens[i].strweight.includes('oz')) {
          const oz = parseFloat(itens[i].strweight.replace(',', '.'));
          const kg = (oz * 0.02834952).toFixed(2);

          try {
            await this.itemModel.findByIdAndUpdate(itens[i]._id, {
              $set: { weight: parseFloat(kg) },
            });
          } catch (error) {
            console.error('deu erro no ${itens[i]._id}');
          }
        }
        if (itens[i].strweight.includes('lb')) {
          const lb = parseFloat(itens[i].strweight.replace(',', '.'));
          const kg = (lb * 0.45359237).toFixed(2);
          try {
            await this.itemModel.findByIdAndUpdate(itens[i]._id, {
              $set: { weight: parseFloat(kg) },
            });
          } catch (error) {
            console.error('deu erro no ${itens[i]._id}');
          }
        }
      }

      const newItem = new Item();
      const item = await this.itemModel.findById(itens[i]._id);
      newItem.name = item.name;
      newItem.source = item.source;
      newItem.rarity = item.rarity;
      newItem.text = item.text;
      newItem.properties = item.properties;
      newItem.weight = item.weight;
      newItem.value = item.value;
      newItem.attunement = item.attunement;

      await this.itemModel.create(newItem);
      await this.itemModel.findByIdAndRemove(itens[i]._id);
    }
  }
}
