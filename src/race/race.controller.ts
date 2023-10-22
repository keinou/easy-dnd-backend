import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RaceService } from './race.service';
import { Race } from './entities/race.entity';

@ApiBearerAuth()
@Controller('race')
@ApiTags('Race')
export class RaceController {
  constructor(private readonly raceService: RaceService) {}

  @Post()
  @ApiOperation({ summary: 'Criar uma nova raça' })
  @ApiResponse({ status: 200, description: 'Foi criado com sucesso', type: Race })
  create(@Body() raceEntity: Race) {
    return this.raceService.create(raceEntity);
  }

  @Get()
  @ApiOperation({ summary: 'Mostrar todas as Raças' })
  @ApiResponse({
    status: 200,
    description: 'Listado com sucesso',
    type: Array<Race>,
  })
  findAll() {
    return this.raceService.findAll();
  }

  @ApiOperation({ summary: 'Mostrar a raça por Id' })
  @ApiResponse({ status: 200, description: 'Encontrou com sucesso', type: Race })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.raceService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar a raça' })
  @ApiResponse({ status: 200, description: 'Atualizado com sucesso', type: Race })
  update(@Param('id') id: string, @Body() raceEntity: Race) {
    return this.raceService.update(id, raceEntity);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletar a raça' })
  @ApiResponse({ status: 200, description: 'Deletado com sucesso', type: Race })
  remove(@Param('id') id: string) {
    return this.raceService.remove(id);
  }
}
