import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CharacterController } from './character.controller';
import { CharacterService } from './character.service';
import { Budget, BudgetSchema, Character, CharacterSchema, InventoryItemSchema } from './entities/character.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Character.name, schema: CharacterSchema },
      { name: Budget.name, schema: BudgetSchema },
      { name: Budget.name, schema: InventoryItemSchema },
    ]),
  ],
  controllers: [CharacterController],
  providers: [CharacterService],
})
export class CharacterModule { }
