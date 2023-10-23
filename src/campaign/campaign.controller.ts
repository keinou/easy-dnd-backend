import { Body, Controller, Delete, Get, Param, Post, Put, Request } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CampaignService } from './campaign.service';
import { Campaign } from './entities/campaign.entity';

@Controller('campaign')
@ApiTags('campaign')
export class CampaignController {
  constructor(private readonly campaignService: CampaignService) { }

  @Post()
  @ApiOperation({ summary: 'Cria uma campanha' })
  @ApiCreatedResponse({ description: 'A campanha foi criado com sucesso', type: Campaign })
  create(@Request() req, @Body() campaign: Campaign) {
    return this.campaignService.create(campaign, req.user.sub);
  }

  @Get()
  @ApiOperation({ summary: 'Lista todas as campanhas' })
  @ApiCreatedResponse({ description: 'Retorna a lista das campanhas', type: Campaign, isArray: true })
  findAll(@Request() req) {
    return this.campaignService.findAll(req.user.sub);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtem uma campanha pelo ID' })
  @ApiResponse({ status: 200, description: 'Retorna a campanha', type: Campaign })
  findOne(@Request() req, @Param('id') id: string) {
    return this.campaignService.findOne(req.user.sub, id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualiza uma campanha' })
  @ApiResponse({ status: 200, description: 'A campanha foi atualizada com sucesso', type: Campaign })
  update(@Request() req, @Param('id') id: string, @Body() campaign: Campaign) {
    return this.campaignService.update(req.user.sub, id, campaign);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove uma campanha' })
  @ApiResponse({ status: 200, description: 'A campanha foi removido com sucesso' })
  remove(@Request() req, @Param('id') id: string) {
    return this.campaignService.remove(req.user.sub, id);
  }
}
