import { BadRequestException, Body, Controller, Get, Param, Post, Request } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Inventory, InventoryItem } from './entities/inventory.entity';
import { InventoryService } from './inventory.service';

@Controller('characters/:id/inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) { }

  @Get()
  @ApiOperation({ summary: 'Obtem o inventario' })
  @ApiResponse({ status: 200, description: 'Retorna a lista de itens no inventario', type: Inventory, isArray: true })
  findAll(@Request() req, @Param('id') id: string) {
    return this.inventoryService.getInventory(id, req.user.sub);
  }

  @Post()
  @ApiOperation({ summary: 'Obtem o inventario' })
  @ApiResponse({ status: 200, description: 'Adicionado com sucesso!', type: Inventory, isArray: true })
  @ApiResponse({ status: 400, description: 'Opa, parece que algum erro aconteceu ao adicionar o item!', type: BadRequestException, isArray: true })
  addInventoryItem(@Request() req, @Param('id') id: string, @Body() item: InventoryItem) {
    return this.inventoryService.addInventoryItem(id, req.user.sub, item);
  }

  // @Delete(':itemId')
  // remove(@Param('id') id: string) {
  //   return this.inventoryService.remove(+id);
  // }
}
