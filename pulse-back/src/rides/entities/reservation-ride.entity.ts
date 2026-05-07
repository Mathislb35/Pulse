import { Users } from '../../users/entities/user.entity';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Ride } from './ride.entity';

@Entity({ name: 'reservation_rides' })
@Index('idx_reservation_rides_ride', ['id_rides'])
@Index('idx_reservation_rides_user', ['id_users'])
@Index('ux_reservation_rides_ride_user', ['id_rides', 'id_users'], {
  unique: true,
})
export class ReservationRide {
  @PrimaryGeneratedColumn({ name: 'id_reserv_rides' })
  id_reserv_rides!: number;

  @Column({ name: 'seats_reserved' })
  seats_reserved!: number;

  @Column({ name: 'status', length: 50 })
  status!: string;

  @Column({ name: 'id_rides' })
  id_rides!: number;

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
