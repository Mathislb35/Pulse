import { Users } from '../../users/entities/user.entity';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Ride } from './ride.entity';

@Entity({ name: 'reservation_rides' })
@Index('idx_reservation_rides_ride', ['id_rides'])
@Index('idx_reservation_rides_user', ['id_users'])
@Index('ux_reservation_rides_ride_user', ['id_rides', 'id_users'], {
  unique: true,
})
export class ReservationRide {
  @ApiProperty({ description: 'Identifiant unique de la réservation', example: 1 })
  @PrimaryGeneratedColumn({ name: 'id_reserv_rides' })
  id_reserv_rides!: number;

  @ApiProperty({ description: 'Nombre de sièges réservés', example: 2 })
  @Column({ name: 'seats_reserved' })
  seats_reserved!: number;

  @ApiProperty({ description: 'Statut de la réservation', example: 'pending' })
  @Column({
    name: 'status',
    type: 'enum',
    enum: ['pending', 'confirmed', 'cancelled'],
    default: 'pending',
  })
  status!: 'pending' | 'confirmed' | 'cancelled';

  @ApiProperty({ description: 'Identifiant du covoiturage', example: 1 })
  @Column({ name: 'id_rides' })
  id_rides!: number;

  @ApiProperty({ description: 'Identifiant de l\'utilisateur', example: 1 })
  @Column({ name: 'id_users' })
  id_users!: number;

  @ManyToOne(() => Ride, (ride) => ride.reservations, {
    eager: false,
    nullable: false,
  })
  @JoinColumn({ name: 'id_rides', referencedColumnName: 'id_rides' })
  ride!: Ride;

  @ManyToOne(() => Users, { eager: false, nullable: false })
  @JoinColumn({ name: 'id_users', referencedColumnName: 'id' })
  user!: Users;
}
