import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Request,
} from '@nestjs/common';
import { RidesService } from './rides.service';
import { CreateRideDto } from './dto/create-ride.dto';
import { CreateRideReservationDto } from './dto/create-ride-reservation.dto';
import { UpdateRideDto } from './dto/update-ride.dto';
import { UpdateRideReservationDto } from './dto/update-ride-reservation.dto';
import { RideFiltersDto } from './dto/ride-filters.dto';
import { Public } from '../auth/public.decorator';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('rides')
@Controller('rides')
export class RidesController {
  constructor(private readonly ridesService: RidesService) {}

  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Créer un nouveau covoiturage' })
  @ApiResponse({ status: 201, description: 'Covoiturage créé avec succès' })
  @ApiResponse({ status: 400, description: 'Données invalides' })
  create(
    @Body() createRideDto: CreateRideDto,
    @Request() req: { user: { id: number } },
  ) {
    return this.ridesService.create(createRideDto, req.user.id);
  }

  @Public()
  @Get()
  @ApiOperation({ summary: 'Récupérer tous les covoiturages (avec filtres)' })
  @ApiResponse({ status: 200, description: 'Liste des covoiturages récupérée avec succès' })
  findAll(@Query() filters: RideFiltersDto) {
    return this.ridesService.findAll(filters);
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Récupérer un covoiturage par son identifiant' })
  @ApiResponse({ status: 200, description: 'Covoiturage récupéré avec succès' })
  @ApiResponse({ status: 404, description: 'Covoiturage non trouvé' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.ridesService.findOne(id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Mettre à jour un covoiturage' })
  @ApiResponse({ status: 200, description: 'Covoiturage mis à jour avec succès' })
  @ApiResponse({ status: 404, description: 'Covoiturage non trouvé' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateRideDto: UpdateRideDto,
    @Request() req: { user: { id: number } },
  ) {
    return this.ridesService.update(id, updateRideDto, req.user.id);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Supprimer un covoiturage' })
  @ApiResponse({ status: 200, description: 'Covoiturage supprimé avec succès' })
  @ApiResponse({ status: 404, description: 'Covoiturage non trouvé' })
  remove(
    @Param('id', ParseIntPipe) id: number,
    @Request() req: { user: { id: number } },
  ) {
    return this.ridesService.remove(id, req.user.id);
  }

  @Get('reservations/me')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Récupérer mes réservations de covoiturages' })
  @ApiResponse({ status: 200, description: 'Liste des réservations récupérée avec succès' })
  findMyReservations(@Request() req: { user: { id: number } }) {
    return this.ridesService.findReservationsByUser(req.user.id);
  }

  @Get(':id/reservations')
  @ApiOperation({ summary: 'Récupérer les réservations d\'un covoiturage' })
  @ApiResponse({ status: 200, description: 'Liste des réservations récupérée avec succès' })
  findReservations(@Param('id', ParseIntPipe) id: number) {
    return this.ridesService.findReservations(id);
  }

  @Post(':id/reservations')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Réserver un covoiturage' })
  @ApiResponse({ status: 201, description: 'Réservation créée avec succès' })
  @ApiResponse({ status: 400, description: 'Données invalides' })
  createReservation(
    @Param('id', ParseIntPipe) id: number,
    @Body() createReservationDto: CreateRideReservationDto,
    @Request() req: { user: { id: number } },
  ) {
    return this.ridesService.createReservation(
      id,
      createReservationDto,
      req.user.id,
    );
  }

  @Patch(':rideId/reservations/:reservationId')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Mettre à jour le statut d\'une réservation' })
  @ApiResponse({ status: 200, description: 'Statut mis à jour avec succès' })
  @ApiResponse({ status: 404, description: 'Réservation non trouvée' })
  updateReservationStatus(
    @Param('rideId', ParseIntPipe) rideId: number,
    @Param('reservationId', ParseIntPipe) reservationId: number,
    @Body() updateReservationDto: UpdateRideReservationDto,
    @Request() req: { user: { id: number } },
  ) {
    return this.ridesService.updateReservationStatus(
      rideId,
      reservationId,
      updateReservationDto,
      req.user.id,
    );
  }

  @Delete(':rideId/reservations/:reservationId')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Annuler une réservation' })
  @ApiResponse({ status: 200, description: 'Réservation annulée avec succès' })
  @ApiResponse({ status: 404, description: 'Réservation non trouvée' })
  removeReservation(
    @Param('rideId', ParseIntPipe) rideId: number,
    @Param('reservationId', ParseIntPipe) reservationId: number,
    @Request() req: { user: { id: number } },
  ) {
    return this.ridesService.removeReservation(
      rideId,
      reservationId,
      req.user.id,
    );
  }
}
