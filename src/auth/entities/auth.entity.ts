import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import mongoose, { Document } from 'mongoose';

export type UserDocument = User & Document;

export enum AuthStategy {
    GOOGLE = 'google',
    LOCAL = 'local',
}

@Schema()
export class User {

    @Prop({ type: mongoose.Schema.Types.ObjectId, auto: true })
    @ApiProperty({ description: 'ID do usuário' })
    _id: string;

    @Prop()
    @ApiProperty({ description: 'Nome do usuário' })
    name: string;

    @Prop()
    @IsNotEmpty()
    @ApiProperty({ description: 'Email do usuário' })
    email: string;

    @Prop()
    @IsNotEmpty()
    password: string;

    @Prop()
    @ApiProperty({ description: 'URL da imagem do usuário' })
    image: string;

    @Prop({ enum: AuthStategy })
    @ApiProperty({ description: 'Estratégia de autenticação do usuário (Google ou Local)', enum: AuthStategy, enumName: 'AuthStategy' })
    stategy: AuthStategy;

    @Prop({ type: Date })
    @ApiProperty({ description: 'Data de criação do usuário' })
    createdAt: Date;

    @Prop({ type: Date })
    @ApiProperty({ description: 'Data do último login do usuário' })
    lastLoginAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
