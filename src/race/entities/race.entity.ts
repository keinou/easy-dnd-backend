import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { SourceEnum } from 'src/utils/source.enum';
import mongoose from 'mongoose';
import { IsNotEmpty } from 'class-validator';

export enum SizeEnum {
  SMALL = 'small',
  MEDIUM = 'medium',
}

@Schema()
export class Race {
  @Prop({ type: mongoose.Schema.Types.ObjectId, auto: true })
  @ApiProperty({ description: 'ID do raça' })
  _id: String;

  @Prop()
  @IsNotEmpty()
  @ApiProperty({ description: 'Nome da raça' })
  name: String;

  @Prop()
  @IsNotEmpty()
  @ApiProperty({ description: 'Habilidade da raça' })
  abillity: String;

  @Prop()
  @IsNotEmpty()
  @ApiProperty({ description: 'Tamanho da raça', enum: SizeEnum, enumName: 'SizeEnum' })
  size: SizeEnum;

  @Prop()
  @IsNotEmpty()
  @ApiProperty({ description: 'Origem', enum: SourceEnum, enumName: 'SourceEnum' })
  source: SourceEnum;

  @Prop()
  @ApiProperty({ description: 'Informações adicionais da raça' })
  additionalInformation: String;
}
export const RaceSchema = SchemaFactory.createForClass(Race);
