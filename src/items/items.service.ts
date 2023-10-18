import { Injectable } from '@nestjs/common';

@Injectable()
export class ItemsService {
  constructor(
    @InjectModel(Item.name) private characterModel: Model<Item>,
  ) { }

  findAll() {
    return this.characterModel.find({ ownerId: ownerId }).exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} item`;
  }
}
