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

@Controller('housing')
export class HousingController {
  constructor(private readonly housingService: HousingService) {}

  @Post()
  create(@Body() createHousingDto: CreateHousingDto) {
    return this.housingService.create(createHousingDto);
  }

  @Public()
  @Get()
  findAll() {
    return this.housingService.findAll();
  }

  @Public()
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.housingService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateHousingDto: UpdateHousingDto,
  ) {
    return this.housingService.update(id, updateHousingDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.housingService.remove(id);
  }

  // Reservations

  @Get('reservations/me')
  findMyReservations(@Request() req: { user: { id: number } }) {
    return this.housingService.findReservationsByUser(req.user.id);
  }

  @Get(':id/reservations')
  findReservations(@Param('id', ParseIntPipe) id: number) {
    return this.housingService.findReservations(id);
  }

  @Post(':id/reservations')
  createReservation(
    @Param('id', ParseIntPipe) id: number,
    @Body() createDto: CreateHousingReservationDto,
    @Request() req: { user: { id: number } },
  ) {
    return this.housingService.createReservation(id, createDto, req.user.id);
  }

  @Patch(':housingId/reservations/:reservationId')
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
