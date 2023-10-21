import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateRaceDto } from './dto/create-race.dto';
import { UpdateRaceDto } from './dto/update-race.dto';
import { RaceService } from './race.service';

@ApiBearerAuth()
@Controller('race')
@ApiTags('Race')
export class RaceController {
  constructor(private readonly raceService: RaceService) { }

  @Post()
  create(@Body() createRaceDto: CreateRaceDto) {
    return this.raceService.create(createRaceDto);
  }

  @Get()
  findAll() {
    return this.raceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.raceService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRaceDto: UpdateRaceDto) {
    return this.raceService.update(+id, updateRaceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.raceService.remove(+id);
  }
}
