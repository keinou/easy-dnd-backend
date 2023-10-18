import { Prop, Schema } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import mongoose from "mongoose";

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
    weight: string;

    @Prop()
    @ApiProperty({ description: 'Valor médio do item' })
    value: string;

    @Prop()
    @ApiProperty({ description: 'Precisa de sintonização?' })
    attunement: string;
}
