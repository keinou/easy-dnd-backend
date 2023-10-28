import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { SourceEnum } from 'src/utils/source.enum';
import mongoose from 'mongoose';
import { IsNotEmpty } from 'class-validator';

export enum SizeEnum {
  SMALL = 'small',
  MEDIUM = 'medium',
}

export class Abillity {
  @ApiProperty({ description: 'Destreza da raça' })
  @Prop()
  dex: number;

  @ApiProperty({ description: 'Força da raça' })
  @Prop()
  str: number;

  @ApiProperty({ description: 'Inteligencia da raça' })
  @Prop()
  int: number;

  @ApiProperty({ description: 'Constituição da raça' })
  @Prop()
  con: number;

  @ApiProperty({ description: 'Carisma da raça' })
  @Prop()
  cha: number;

  @ApiProperty({ description: 'Sabedoria da raça' })
  @Prop()
  wis: number;
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
  abillity: Abillity;

  @Prop()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Tamanho da raça',
    enum: SizeEnum,
    enumName: 'SizeEnum',
  })
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
