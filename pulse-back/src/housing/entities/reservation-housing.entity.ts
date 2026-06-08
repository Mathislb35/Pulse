import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Housing } from './housing.entity';
import { Users } from '../../users/entities/user.entity';

@Entity({ name: 'reservation_housing' })
export class ReservationHousing {
  @PrimaryGeneratedColumn({ name: 'id_reserv_housing' })
  id_reserv_housing!: number;

  @Column({ name: 'places_reserved', nullable: true })
  places_reserved!: number;

  @Column({
    name: 'status',
    type: 'enum',
    enum: ['pending', 'confirmed', 'cancelled'],
    default: 'pending',
  })
  status!: 'pending' | 'confirmed' | 'cancelled';

  @Column({ name: 'arrival_date', type: 'date', nullable: true })
  arrival_date!: Date;

  @Column({ name: 'departure_date', type: 'date', nullable: true })
  departure_date!: Date;

  @Column({ name: 'id_housing' })
  id_housing!: number;

  @Column({ name: 'id_users' })
  id_users!: number;

  @ManyToOne(() => Housing, (housing) => housing.reservations, {
    eager: false,
    nullable: false,
  })
  @JoinColumn({ name: 'id_housing', referencedColumnName: 'id_housing' })
  housing!: Housing;

  @ManyToOne(() => Users, { eager: false, nullable: false })
  @JoinColumn({ name: 'id_users', referencedColumnName: 'id' })
  user!: Users;
}
