import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional } from "class-validator";
import mongoose from "mongoose";
import { User } from "src/auth/entities/auth.entity";
import { Character } from "src/character/entities/character.entity";
export type CampaignDocument = Campaign & Document;

@Schema()
export class Campaign {
  @Prop({ type: mongoose.Schema.Types.ObjectId, auto: true })
  @ApiProperty({ description: 'ID da campanha' })
  _id: string;

  @Prop()
  @IsNotEmpty()
  @ApiProperty({ description: 'Nome da campanha' })
  name: string

  @Prop()
  @IsOptional()
  @ApiProperty({ description: 'Descricao da campanha' })
  description: string

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: "User" })
  @IsOptional()
  _characters: Character["_id"][]

  @ApiProperty({ description: 'O ID do proprietário da campanha (Mestre)' })
  @IsNotEmpty()
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User" })
  _owner: User["_id"];
}
export const CampaignSchema = SchemaFactory.createForClass(Campaign);
