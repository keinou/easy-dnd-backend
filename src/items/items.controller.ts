import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Item } from './entities/item.entity';
import { ItemsService } from './items.service';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) { }

  @Get()
  @ApiOperation({ summary: 'Lista todos os items' })
  @ApiResponse({ status: 200, description: 'Retorna a lista de items', type: Item, isArray: true })
  findAll() {
    return this.itemsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.itemsService.findOne(+id);
  }
}
