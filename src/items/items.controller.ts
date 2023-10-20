import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Item } from './entities/item.entity';
import { ItemsService } from './items.service';

@Controller('items')
@ApiTags('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) { }

  @Get()
  @ApiOperation({ summary: 'Lista todos os items' })
  @ApiResponse({ status: 200, description: 'Retorna a lista de items', type: Item, isArray: true })
  @ApiQuery({ name: 'page', description: "Qual pagina esta buscando", example: 1 })
  @ApiQuery({ name: 'pageSize', description: "Quantidade de documentos na pagina", example: 10 })
  findAll(@Query('page') page = 1, @Query('pageSize') pageSize = 10) {
    return this.itemsService.findAll(page, pageSize);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.itemsService.findOne(id);
  }
}
