import { Module } from '@nestjs/common';
import { RaceService } from './race.service';
import { RaceController } from './race.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Race, RaceSchema } from './entities/race.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Race.name,
        schema: RaceSchema,
      },
    ]),
  ],
  controllers: [RaceController],
  providers: [RaceService],
})
export class RaceModule {}
