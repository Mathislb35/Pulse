import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Request,
} from '@nestjs/common';
import { HousingService } from './housing.service';
import { CreateHousingDto } from './dto/create-housing.dto';
import { UpdateHousingDto } from './dto/update-housing.dto';
import { CreateHousingReservationDto } from './dto/create-housing-reservation.dto';
import { UpdateHousingReservationDto } from './dto/update-housing-reservation.dto';
import { Public } from '../auth/public.decorator';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('housing')
@Controller('housing')
export class HousingController {
  constructor(private readonly housingService: HousingService) {}

  @Post()
  @ApiOperation({ summary: 'Créer un nouveau logement' })
  @ApiResponse({ status: 201, description: 'Logement créé avec succès' })
  @ApiResponse({ status: 400, description: 'Données invalides' })
  create(@Body() createHousingDto: CreateHousingDto) {
    return this.housingService.create(createHousingDto);
  }

  @Public()
  @Get()
  @ApiOperation({ summary: 'Récupérer tous les logements' })
  @ApiResponse({ status: 200, description: 'Liste des logements récupérée avec succès' })
  findAll() {
    return this.housingService.findAll();
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Récupérer un logement par son identifiant' })
  @ApiResponse({ status: 200, description: 'Logement récupéré avec succès' })
  @ApiResponse({ status: 404, description: 'Logement non trouvé' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.housingService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Mettre à jour un logement' })
  @ApiResponse({ status: 200, description: 'Logement mis à jour avec succès' })
  @ApiResponse({ status: 404, description: 'Logement non trouvé' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateHousingDto: UpdateHousingDto,
  ) {
    return this.housingService.update(id, updateHousingDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer un logement' })
  @ApiResponse({ status: 200, description: 'Logement supprimé avec succès' })
  @ApiResponse({ status: 404, description: 'Logement non trouvé' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.housingService.remove(id);
  }

  @Get('reservations/me')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Récupérer mes réservations de logements' })
  @ApiResponse({ status: 200, description: 'Liste des réservations récupérée avec succès' })
  findMyReservations(@Request() req: { user: { id: number } }) {
    return this.housingService.findReservationsByUser(req.user.id);
  }

  @Get(':id/reservations')
  @ApiOperation({ summary: 'Récupérer les réservations d\'un logement' })
  @ApiResponse({ status: 200, description: 'Liste des réservations récupérée avec succès' })
  findReservations(@Param('id', ParseIntPipe) id: number) {
    return this.housingService.findReservations(id);
  }

  @Post(':id/reservations')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Réserver un logement' })
  @ApiResponse({ status: 201, description: 'Réservation créée avec succès' })
  @ApiResponse({ status: 400, description: 'Données invalides' })
  createReservation(
    @Param('id', ParseIntPipe) id: number,
    @Body() createDto: CreateHousingReservationDto,
    @Request() req: { user: { id: number } },
  ) {
    return this.housingService.createReservation(id, createDto, req.user.id);
  }

  @Patch(':housingId/reservations/:reservationId')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Mettre à jour le statut d\'une réservation' })
  @ApiResponse({ status: 200, description: 'Statut mis à jour avec succès' })
  @ApiResponse({ status: 404, description: 'Réservation non trouvée' })
  updateReservationStatus(
    @Param('housingId', ParseIntPipe) housingId: number,
    @Param('reservationId', ParseIntPipe) reservationId: number,
    @Body() updateDto: UpdateHousingReservationDto,
    @Request() req: { user: { id: number } },
  ) {
    return this.housingService.updateReservationStatus(
      housingId,
      reservationId,
      updateDto,
      req.user.id,
    );
  }

  @Delete(':housingId/reservations/:reservationId')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Annuler une réservation' })
  @ApiResponse({ status: 200, description: 'Réservation annulée avec succès' })
  @ApiResponse({ status: 404, description: 'Réservation non trouvée' })
  removeReservation(
    @Param('housingId', ParseIntPipe) housingId: number,
    @Param('reservationId', ParseIntPipe) reservationId: number,
    @Request() req: { user: { id: number } },
  ) {
    return this.housingService.removeReservation(
      housingId,
      reservationId,
      req.user.id,
    );
  }
}
