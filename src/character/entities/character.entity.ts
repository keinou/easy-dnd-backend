import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import mongoose from 'mongoose';
import { User } from 'src/auth/entities/auth.entity';
import { Inventory } from '../../inventory/entities/inventory.entity';

export class Budget {
    @ApiProperty({ description: 'Copper piece' })
    @Prop()
    cp: number;

    @ApiProperty({ description: 'Silver piece' })
    @Prop()
    sp: number;

    @ApiProperty({ description: 'Gold piece' })
    @Prop()
    gp: number;

    @ApiProperty({ description: 'Platinum piece' })
    @Prop()
    pp: number;
}

@Schema()
export class Character {
    @Prop({ type: mongoose.Schema.Types.ObjectId, auto: true })
    @ApiProperty({ description: 'ID do usuário' })
    _id: string;

    @ApiProperty({ description: 'O nome do personagem' })
    @IsNotEmpty()
    @Prop()
    name: string;

    @ApiProperty({ description: 'A raça do personagem' })
    @IsNotEmpty()
    @Prop()
    race: string;

    @Prop()
    @IsNotEmpty()
    @ApiProperty({ description: 'A classe do personagem' })
    class: string;

    @Prop({ type: Budget })
    @ApiProperty({ description: 'Carteira' })
    budget: Budget;

    @ApiProperty({ description: 'O nível do personagem' })
    @IsNotEmpty()
    @Prop()
    level: number;

    @ApiProperty({ description: 'O ID do inventario do personagem' })
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Inventory" })
    _inventory: Inventory["_id"];

    @ApiProperty({ description: 'O ID do proprietário do personagem' })
    @IsNotEmpty()
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User" })
    _owner: User["_id"];

}
export const CharacterSchema = SchemaFactory.createForClass(Character);
CharacterSchema.index({ _owner: 1, name: 1 });

//export const BudgetSchema = SchemaFactory.createForClass(Budget);
