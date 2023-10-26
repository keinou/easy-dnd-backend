import { Controller, Get, Param, Put, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOAuth2, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Item } from './entities/item.entity';
import { ItemsService } from './items.service';

@ApiBearerAuth()
@Controller('items')
@ApiTags('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) { }

  @Get()
  @ApiOperation({ summary: 'Lista todos os items' })
  @ApiResponse({ status: 200, description: 'Retorna a lista de items', type: Item, isArray: true })
  @ApiQuery({ name: 'page', description: "Qual pagina esta buscando", example: 1 })
  @ApiQuery({ name: 'pageSize', description: "Quantidade de documentos na pagina", example: 10 })
  @ApiQuery({ name: 'filter', description: "Filtra itens baseado no nome", example: "armor" })
  findAll(@Query('page') page = 1, @Query('pageSize') pageSize = 10, @Query('filter') filter = null) {
    return this.itemsService.findAll(page, pageSize, filter);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.itemsService.findOne(id);
  }

  @Put('convert')
  convertWeight(){
    return this.itemsService.changedWeight()
  }

  @Get('convert')
  test(){
    const stringTest = '1,2 oz'
    const stringConvert = stringTest.replace(',', '.')
    console.log( parseFloat( stringConvert))
  }

}
