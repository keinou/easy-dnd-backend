import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel } from 'mongoose';
import { Item } from './entities/item.entity';

@Injectable()
export class ItemsService {
  constructor(
    @InjectModel(Item.name) private itemModel: PaginateModel<Item>,
  ) { }

  async findAll(page: number, pageSize: number, filter: string) {
    const query = {};

    if (filter) {
      query['name'] = { $regex: new RegExp(filter, 'i') };
    }

    const response = await this.itemModel.paginate(query, {
      page: page,
      limit: pageSize
    });

    return response;
  }

  findOne(id: string) {
    return this.itemModel.findById(id);
  }
}
