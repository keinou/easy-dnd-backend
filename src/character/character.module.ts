import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Inventory, InventorySchema } from '../inventory/entities/inventory.entity';
import { CharacterController } from './character.controller';
import { CharacterService } from './character.service';
import { Character, CharacterSchema } from './entities/character.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Character.name, schema: CharacterSchema },
      { name: Inventory.name, schema: InventorySchema },
    ]),
  ],
  controllers: [CharacterController],
  providers: [CharacterService],
  exports: [CharacterService],
})
export class CharacterModule { }
