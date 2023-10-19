import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import mongoose from 'mongoose';
import { Item } from 'src/items/entities/item.entity';

@Schema()
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
export class InventoryItem {
    @ApiProperty({ description: 'Quantidade' })
    @Prop()
    quantity: number;

    @ApiProperty({ description: 'Item' })
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'items' })
    item: Item;
}

@Schema()
export class Character {
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

    @Prop()
    @ApiProperty({ description: 'Carteira' })
    budget: Budget;

    // @Prop({})
    // @ApiProperty({ description: 'Inventario', type: [InventoryItem] })
    // inventory: InventoryItem[];

    @ApiProperty({ description: 'O nível do personagem' })
    @IsNotEmpty()
    @Prop()
    level: number;

    @ApiProperty({ description: 'O ID do proprietário do personagem' })
    @IsNotEmpty()
    @Prop({ type: String })
    ownerId: string;
}

export const CharacterSchema = SchemaFactory.createForClass(Character);
export const BudgetSchema = SchemaFactory.createForClass(Budget);
export const InventoryItemSchema = SchemaFactory.createForClass(InventoryItem);
