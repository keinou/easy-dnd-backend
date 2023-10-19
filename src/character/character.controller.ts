import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CharacterService } from './character.service';
import { Budget, Character } from './entities/character.entity';

@Controller('characters')
@ApiTags('characters')
export class CharacterController {
  constructor(private readonly characterService: CharacterService) { }

  @Post()
  @ApiOperation({ summary: 'Cria um novo personagem' })
  @ApiCreatedResponse({ description: 'O personagem foi criado com sucesso', type: Character })
  create(@Request() req, @Body() characterData: Character) {
    const char = this.characterService.create(characterData, req.user.sub);
    return char;
  }

  @Get()
  @ApiOperation({ summary: 'Lista todos os personagens' })
  @ApiResponse({ status: 200, description: 'Retorna a lista de personagens', type: Character, isArray: true })
  findAll(@Request() req) {
    return this.characterService.findAll(req.user.sub);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtém um personagem pelo ID' })
  @ApiResponse({ status: 200, description: 'Retorna o personagem', type: Character })
  findOne(@Request() req, @Param('id') id: string) {
    return this.characterService.findOne(req.user.sub, id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualiza um personagem' })
  @ApiResponse({ status: 200, description: 'O personagem foi atualizado com sucesso', type: Character })
  update(@Request() req, @Param('id') id: string, @Body() characterData: Character) {
    return this.characterService.update(req.user.sub, id, characterData);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove um personagem' })
  @ApiResponse({ status: 200, description: 'O personagem foi removido com sucesso' })
  remove(@Request() req, @Param('id') id: string) {
    return this.characterService.remove(req.user.sub, id);
  }

  @Get(':id/budget')
  @ApiOperation({ summary: 'Obtém a carteira de personagem pelo ID' })
  @ApiResponse({ status: 200, description: 'Retorna o budget de um personagem', type: Budget })
  findOneBudget(@Request() req, @Param('id') id: string) {
    return this.characterService.findOneBudget(req.user.sub, id);
  }
}
