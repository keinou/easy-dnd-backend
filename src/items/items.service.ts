import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Item } from './entities/item.entity';

@Injectable()
export class ItemsService {
  constructor(
    @InjectModel(Item.name) private itemModel: Model<Item>,
  ) { }

  findAll() {
    return this.itemModel.find().exec();
  }

  findOne(id: string) {
    return this.itemModel.findById(id);
  }
}
