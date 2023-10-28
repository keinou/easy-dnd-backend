import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Race } from './entities/race.entity';
import { Model } from 'mongoose';

@Injectable()
export class RaceService {
  constructor(@InjectModel(Race.name) private raceModel: Model<Race>) {}

  async create(raceEntity: Race): Promise<Race> {
    const race = await this.raceModel.findOne({ name: raceEntity.name });
    if (race) {
      throw new BadRequestException('A race with the same name already exists');
    }
    return this.raceModel.create(raceEntity);
  }
  async findAll(): Promise<Array<Race>> {
    const races = await this.raceModel.find();
    return races;
  }

  async findOne(id: string): Promise<Race> {
    const race = await this.raceModel.findById(id);

    if (!race) {
      throw new NotFoundException();
    }

    return race;
  }

  async update(id: string, raceEntity: Race): Promise<Race> {
    return this.raceModel.findByIdAndUpdate(id, raceEntity, { new: true });
  }

  async remove(id: string): Promise<Race> {
    return this.raceModel.findByIdAndRemove(id);
  }
}
