import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateHousingDto } from './dto/create-housing.dto';
import { UpdateHousingDto } from './dto/update-housing.dto';
import { CreateHousingReservationDto } from './dto/create-housing-reservation.dto';
import { UpdateHousingReservationDto } from './dto/update-housing-reservation.dto';
import { Housing } from './entities/housing.entity';
import { ReservationHousing } from './entities/reservation-housing.entity';

@Injectable()
export class HousingService {
  constructor(
    @InjectRepository(Housing)
    private readonly housingRepository: Repository<Housing>,
    @InjectRepository(ReservationHousing)
    private readonly reservationsRepository: Repository<ReservationHousing>,
  ) {}

  async create(createHousingDto: CreateHousingDto): Promise<Housing> {
    const housing = this.housingRepository.create(createHousingDto);
    return this.housingRepository.save(housing);
  }

  async findAll(): Promise<Housing[]> {
    return this.housingRepository.find({
      relations: {
        event: true,
      },
    });
  }

  async findOne(id: number): Promise<Housing> {
    const housing = await this.housingRepository.findOne({
      where: { id_housing: id },
      relations: {
        event: true,
        reservations: {
          user: true,
        },
      },
    });

    if (!housing) {
      throw new NotFoundException(`Le logement ${id} est introuvable.`);
    }

    return housing;
  }

  async update(id: number, updateHousingDto: UpdateHousingDto): Promise<Housing> {
    const housing = await this.findOne(id);
    await this.housingRepository.update(id, updateHousingDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const housing = await this.findOne(id);
    await this.housingRepository.remove(housing);
  }

  // Reservation Logic

  async findReservations(housingId: number): Promise<ReservationHousing[]> {
    await this.findOne(housingId);
    return this.reservationsRepository.find({
      where: { id_housing: housingId },
      relations: { user: true },
    });
  }

  async findReservationsByUser(userId: number): Promise<ReservationHousing[]> {
    return this.reservationsRepository.find({
      where: { id_users: userId },
      relations: {
        housing: {
          event: true,
        },
      },
    });
  }

  async createReservation(
    housingId: number,
    createDto: CreateHousingReservationDto,
    userId: number,
  ): Promise<ReservationHousing> {
    const housing = await this.findOne(housingId);

    // Logic: check if enough places
    const confirmedReservations = await this.reservationsRepository.find({
      where: {
        id_housing: housingId,
        status: 'confirmed',
      },
    });

    const reservedPlaces = confirmedReservations.reduce(
      (sum, res) => sum + (res.places_reserved || 0),
      0,
    );

    if (reservedPlaces + createDto.places_reserved > housing.available_places) {
      throw new ConflictException(
        `Il n'y a plus assez de places disponibles (${
          housing.available_places - reservedPlaces
        } restantes).`,
      );
    }

    const reservation = this.reservationsRepository.create({
      ...createDto,
      id_housing: housingId,
      id_users: userId,
      status: 'pending',
    });

    return this.reservationsRepository.save(reservation);
  }

  async updateReservationStatus(
    housingId: number,
    reservationId: number,
    updateDto: UpdateHousingReservationDto,
    userId: number,
  ): Promise<ReservationHousing> {
    const housing = await this.findOne(housingId);
    // In a real app, we'd check if the user is the owner of the event/housing
    // For now, let's assume any authenticated user can update (or add ownership logic if user entity has it)
    
    const reservation = await this.reservationsRepository.findOne({
      where: { id_reserv_housing: reservationId, id_housing: housingId },
    });

    if (!reservation) {
      throw new NotFoundException(`Réservation ${reservationId} introuvable.`);
    }

    if (updateDto.status === 'confirmed' && reservation.status !== 'confirmed') {
      const confirmedReservations = await this.reservationsRepository.find({
        where: { id_housing: housingId, status: 'confirmed' },
      });

      const reservedPlaces = confirmedReservations.reduce(
        (sum, res) => sum + (res.places_reserved || 0),
        0,
      );

      if (reservedPlaces + reservation.places_reserved > housing.available_places) {
        throw new ConflictException(`Plus assez de places pour confirmer.`);
      }
    }

    reservation.status = updateDto.status;
    return this.reservationsRepository.save(reservation);
  }

  async removeReservation(
    housingId: number,
    reservationId: number,
    userId: number,
  ): Promise<void> {
    const reservation = await this.reservationsRepository.findOne({
      where: { id_reserv_housing: reservationId, id_housing: housingId },
    });

    if (!reservation) {
      throw new NotFoundException(`Réservation ${reservationId} introuvable.`);
    }

    if (reservation.id_users !== userId) {
      throw new ForbiddenException(`Vous ne pouvez pas annuler cette réservation.`);
    }

    await this.reservationsRepository.delete(reservationId);
  }
}
