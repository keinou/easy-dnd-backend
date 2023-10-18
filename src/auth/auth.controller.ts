import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { Public } from './constants';
import { UserLoginDto } from './dto/auth.login.dto';
import { User } from './entities/auth.entity';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Public()
  @Post('/login')
  @ApiOperation({ summary: 'Autenticação de usuário', description: 'Faça login com email e senha ou token ou com o token do oAuth2 da Google SSO' })
  @ApiBody({ type: UserLoginDto })
  login(@Body() userLogin: UserLoginDto): Promise<any> {
    return this.authService.authenticate(userLogin);
  }

  @Public()
  @Post('/singup')
  @ApiOperation({ summary: 'Registro de usuário', description: 'Registre um novo usuário.' })
  @ApiResponse({ status: 201, description: 'Cadastro realizado com sucesso' })
  @ApiResponse({ status: 400, description: 'Opa, parece que esta faltando algum dado!' })
  @ApiBody({ type: User })
  singup(@Body() user: User): Promise<any> {
    return this.authService.create(user);
  }

  @UseGuards(AuthGuard)
  @Get('/profile')
  @ApiBody({ type: User })
  @ApiResponse({ status: 200, type: User, description: 'Resposta de sucesso' })
  @ApiResponse({ status: 401, description: 'Nao autenticado' })
  @ApiOperation({ summary: 'Perfil do usuário', description: 'Obtenha o perfil do usuário autenticado.' })
  getProfile(@Request() req) {
    return this.authService.findOne(req.user.username);
  }
}
