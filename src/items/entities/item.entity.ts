import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import mongoose from "mongoose";
import * as mongoosePaginate from 'mongoose-paginate-v2';
export type ItemDocument = Item & Document;

@Schema()
export class Item {

    @Prop({ type: mongoose.Schema.Types.ObjectId, auto: true })
    @ApiProperty({ description: 'ID do item' })
    _id: string;

    @Prop()
    @ApiProperty({ description: 'Nome do item' })
    name: string;

    @Prop()
    @ApiProperty({ description: 'Origem da informacao' })
    source: string;

    @Prop()
    @ApiProperty({ description: 'Raridade do item' })
    rarity: string;

    @Prop()
    @ApiProperty({ description: 'Descrição do item' })
    text: string;

    @Prop()
    @ApiProperty({ description: 'Propriedades do item' })
    properties: string;
    
    @Prop()
    @ApiProperty({ description: 'Peso do item' })
    strweight: string;
    
    @Prop()
    @ApiProperty({ description: 'Peso do item' })
    weight: number;

    @Prop()
    @ApiProperty({ description: 'Valor médio do item' })
    value: string;

    @Prop()
    @ApiProperty({ description: 'Precisa de sintonização?' })
    attunement: string;
}

export const ItemSchema = SchemaFactory.createForClass(Item);
ItemSchema.plugin(mongoosePaginate);