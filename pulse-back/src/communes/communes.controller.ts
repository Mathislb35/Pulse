import { Controller, Get, Param } from '@nestjs/common';
import { CommunesService } from './communes.service';
import { Public } from '../auth/public.decorator';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('communes')
@Controller('communes')
export class CommunesController {
  constructor(private readonly communesService: CommunesService) {}

  @Public()
  @Get()
  @ApiOperation({ summary: 'Récupérer toutes les communes' })
  @ApiResponse({ status: 200, description: 'Liste des communes récupérée avec succès' })
  findAll() {
    return this.communesService.findAll();
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Récupérer une commune par son identifiant' })
  @ApiResponse({ status: 200, description: 'Commune récupérée avec succès' })
  @ApiResponse({ status: 404, description: 'Commune non trouvée' })
  findOne(@Param('id') id: string) {
    return this.communesService.findOne(+id);
  }
}
