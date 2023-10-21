import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import mongoose from "mongoose";
import { User } from "src/auth/entities/auth.entity";
import { Character } from "src/character/entities/character.entity";
import { Item } from "src/items/entities/item.entity";

export class InventoryItem {
    @ApiProperty({ description: 'Quantidade' })
    @Prop()
    quantity: number;

    @ApiProperty({ description: 'Item' })
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Item' })
    item: Item["_id"];

    @ApiProperty({ description: 'Observacao/Notas do jogador' })
    @Prop()
    notes: string;
}

@Schema()
export class Inventory {
    @Prop({ type: mongoose.Schema.Types.ObjectId, auto: true })
    @ApiProperty({ description: 'ID do usuário' })
    _id: string;

    @ApiProperty({ description: 'O ID do proprietário do personagem' })
    @IsNotEmpty()
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User" })
    _owner: User["_id"];

    @ApiProperty({ description: 'O ID do proprietário do personagem' })
    @IsNotEmpty()
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Character" })
    _character: Character["_id"];

    @ApiProperty({ description: 'Items no inventario' })
    @IsNotEmpty()
    @Prop()
    items: typeof InventoryItemSchema[];
}

export const InventorySchema = SchemaFactory.createForClass(Inventory);
export const InventoryItemSchema = SchemaFactory.createForClass(InventoryItem);