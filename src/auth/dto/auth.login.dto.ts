import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';


export class UserLoginDto {


    @ApiProperty({ description: 'Email do usuário' })
    email: string;

    @IsNotEmpty()
    @ApiProperty({ description: 'Senha do usuário' })
    password: string;

    @ApiProperty({ description: 'Token gerado pelo oAuth do Google' })
    token: string;
}
