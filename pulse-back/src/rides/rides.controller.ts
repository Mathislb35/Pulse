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

@Controller('rides')
export class RidesController {
  constructor(private readonly ridesService: RidesService) {}

  @Post()
  create(
    @Body() createRideDto: CreateRideDto,
    @Request() req: { user: { id: number } },
  ) {
    return this.ridesService.create(createRideDto, req.user.id);
  }

  @Public()
  @Get()
  findAll(@Query() filters: RideFiltersDto) {
    return this.ridesService.findAll(filters);
  }

  @Public()
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.ridesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateRideDto: UpdateRideDto,
    @Request() req: { user: { id: number } },
  ) {
    return this.ridesService.update(id, updateRideDto, req.user.id);
  }

  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe) id: number,
    @Request() req: { user: { id: number } },
  ) {
    return this.ridesService.remove(id, req.user.id);
  }

  @Get('reservations/me')
  findMyReservations(@Request() req: { user: { id: number } }) {
    return this.ridesService.findReservationsByUser(req.user.id);
  }

  @Get(':id/reservations')
  findReservations(@Param('id', ParseIntPipe) id: number) {
    return this.ridesService.findReservations(id);
  }

  @Post(':id/reservations')
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
