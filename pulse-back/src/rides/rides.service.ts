import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, FindOptionsWhere, Repository } from 'typeorm';
import { CreateRideDto } from './dto/create-ride.dto';
import { CreateRideReservationDto } from './dto/create-ride-reservation.dto';
import { UpdateRideDto } from './dto/update-ride.dto';
import { UpdateRideReservationDto } from './dto/update-ride-reservation.dto';
import { RideFiltersDto } from './dto/ride-filters.dto';
import { ReservationRide } from './entities/reservation-ride.entity';
import { Ride } from './entities/ride.entity';

@Injectable()
export class RidesService {
  constructor(
    @InjectRepository(Ride)
    private readonly ridesRepository: Repository<Ride>,
    @InjectRepository(ReservationRide)
    private readonly reservationsRepository: Repository<ReservationRide>,
  ) {}

  async create(createRideDto: CreateRideDto, userId: number): Promise<Ride> {
    const ride = this.ridesRepository.create({
      ...this.normalizeRidePayload(createRideDto),
      id_users: userId,
    });

    return this.ridesRepository.save(ride);
  }

  async findAll(filters: RideFiltersDto): Promise<Ride[]> {
    const where: FindOptionsWhere<Ride> = {};

    if (filters.id_events) {
      where.id_events = filters.id_events;
    }

    if (filters.id_users) {
      where.id_users = filters.id_users;
    }

    if (filters.departure_commune_id) {
      where.departure_commune_id = filters.departure_commune_id;
    }

    if (filters.arrival_commune_id) {
      where.arrival_commune_id = filters.arrival_commune_id;
    }

    if (filters.date) {
      const startOfDay = new Date(filters.date);
      startOfDay.setHours(0, 0, 0, 0);

      const endOfDay = new Date(filters.date);
      endOfDay.setHours(23, 59, 59, 999);

      where.departure_time = Between(startOfDay, endOfDay);
    }

    return this.ridesRepository.find({
      where,
      order: {
        departure_time: 'ASC',
      },
      relations: {
        user: true,
        event: true,
      },
    });
  }

  async findOne(id: number): Promise<Ride> {
    const ride = await this.ridesRepository.findOne({
      where: { id_rides: id },
      relations: {
        user: true,
        event: true,
        reservations: {
          user: true,
        },
      },
    });

    if (!ride) {
      throw new NotFoundException(`Le trajet ${id} est introuvable.`);
    }

    return ride;
  }

  async update(
    id: number,
    updateRideDto: UpdateRideDto,
    userId: number,
  ): Promise<Ride> {
    const ride = await this.findOne(id);
    this.assertRideOwner(ride, userId);

    await this.ridesRepository.update(id, this.normalizeRidePayload(updateRideDto));

    return this.findOne(id);
  }

  async remove(id: number, userId: number): Promise<void> {
    const ride = await this.findOne(id);
    this.assertRideOwner(ride, userId);

    await this.ridesRepository.delete(id);
  }

  async findReservations(rideId: number): Promise<ReservationRide[]> {
    await this.findOne(rideId);

    return this.reservationsRepository.find({
      where: { id_rides: rideId },
      order: {
        id_reserv_rides: 'ASC',
      },
      relations: {
        user: true,
      },
    });
  }

  async findReservationsByUser(userId: number): Promise<ReservationRide[]> {
    return this.reservationsRepository.find({
      where: { id_users: userId },
      relations: {
        ride: {
          user: true,
        },
      },
      order: {
        id_reserv_rides: 'DESC',
      },
    });
  }

  async createReservation(
    rideId: number,
    createReservationDto: CreateRideReservationDto,
    userId: number,
  ): Promise<ReservationRide> {
    const ride = await this.findOne(rideId);

    if (ride.id_users === userId) {
      throw new ConflictException(
        'Le conducteur ne peut pas reserver son propre trajet.',
      );
    }

    const existingReservation = await this.reservationsRepository.findOne({
      where: {
        id_rides: rideId,
        id_users: userId,
      },
    });

    if (existingReservation) {
      throw new ConflictException(
        'Une reservation existe déjà pour cet utilisateur sur ce trajet.',
      );
    }

    // Check available seats
    const acceptedReservations = await this.reservationsRepository.find({
      where: {
        id_rides: rideId,
        status: 'accepted',
      },
    });

    const reservedSeats = acceptedReservations.reduce(
      (sum, res) => sum + res.seats_reserved,
      0,
    );

    if (reservedSeats + createReservationDto.seats_reserved > ride.available_seats) {
      throw new ConflictException(
        `Il n'y a plus assez de places disponibles (${
          ride.available_seats - reservedSeats
        } restantes).`,
      );
    }

    const reservation = this.reservationsRepository.create({
      ...createReservationDto,
      status: 'pending',
      id_rides: rideId,
      id_users: userId,
    });

    return this.reservationsRepository.save(reservation);
  }

  async updateReservationStatus(
    rideId: number,
    reservationId: number,
    updateReservationDto: UpdateRideReservationDto,
    userId: number,
  ): Promise<ReservationRide> {
    const ride = await this.findOne(rideId);
    this.assertRideOwner(ride, userId);

    const reservation = await this.getReservationOrFail(rideId, reservationId);

    if (updateReservationDto.status === 'accepted' && reservation.status !== 'accepted') {
      const acceptedReservations = await this.reservationsRepository.find({
        where: {
          id_rides: rideId,
          status: 'accepted',
        },
      });

      const reservedSeats = acceptedReservations.reduce(
        (sum, res) => sum + res.seats_reserved,
        0,
      );

      if (reservedSeats + reservation.seats_reserved > ride.available_seats) {
        throw new ConflictException(
          `Impossible d'accepter cette réservation : plus assez de places disponibles (${
            ride.available_seats - reservedSeats
          } restantes).`,
        );
      }
    }

    reservation.status = updateReservationDto.status;
    return this.reservationsRepository.save(reservation);
  }

  async removeReservation(
    rideId: number,
    reservationId: number,
    userId: number,
  ): Promise<void> {
    const reservation = await this.getReservationOrFail(rideId, reservationId);

    if (reservation.id_users !== userId) {
      const ride = await this.findOne(rideId);
      this.assertRideOwner(ride, userId);
    }

    await this.reservationsRepository.delete(reservationId);
  }

  private normalizeRidePayload(
    rideDto: CreateRideDto | UpdateRideDto,
  ): Partial<Ride> {
    const { departure_time, ...rest } = rideDto;
    const payload: Partial<Ride> = { ...rest };

    if (departure_time) {
      payload.departure_time = new Date(departure_time);
    }

    return payload;
  }

  private assertRideOwner(ride: Ride, userId: number): void {
    if (ride.id_users !== userId) {
      throw new ForbiddenException(
        'Vous ne pouvez pas modifier un trajet qui ne vous appartient pas.',
      );
    }
  }

  private async getReservationOrFail(
    rideId: number,
    reservationId: number,
  ): Promise<ReservationRide> {
    const reservation = await this.reservationsRepository.findOne({
      where: {
        id_reserv_rides: reservationId,
        id_rides: rideId,
      },
    });

    if (!reservation) {
      throw new NotFoundException(
        `La reservation ${reservationId} est introuvable pour le trajet ${rideId}.`,
      );
    }

    return reservation;
  }
}
