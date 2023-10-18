import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

@Schema()
export class Character extends Document {
    @ApiProperty({ description: 'O nome do personagem' })
    @Prop()
    name: string;

    @ApiProperty({ description: 'A raça do personagem' })
    @Prop()
    race: string;

    @ApiProperty({ description: 'A classe do personagem' })
    @Prop()
    class: string;

    @ApiProperty({ description: 'O nível do personagem' })
    @Prop()
    level: number;

    @ApiProperty({ description: 'O ID do proprietário do personagem' })
    @Prop({ type: String })
    ownerId: string;
}

export const CharacterSchema = SchemaFactory.createForClass(Character);
