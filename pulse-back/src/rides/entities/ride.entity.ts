import { Event } from '../../events/entities/event.entity';
import { Users } from '../../users/entities/user.entity';
import { Commune } from '../../communes/entities/commune.entity';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ReservationRide } from './reservation-ride.entity';

@Entity({ name: 'rides' })
@Index('idx_rides_departure_commune', ['departure_commune_id'])
@Index('idx_rides_arrival_commune', ['arrival_commune_id'])
@Index('idx_rides_user', ['id_users'])
@Index('idx_rides_event', ['id_events'])
export class Ride {
  @PrimaryGeneratedColumn({ name: 'id_rides' })
  id_rides!: number;

  @Column({ name: 'departure_time', type: 'datetime' })
  departure_time!: Date;

  @Column({ name: 'price' })
  price!: number;

  @Column({ name: 'available_seats' })
  available_seats!: number;

  @Column({ name: 'description' })
  description!: string;

  @Column({ name: 'departure_commune_id' })
  departure_commune_id!: number;

  @Column({ name: 'arrival_commune_id' })
  arrival_commune_id!: number;

  @ManyToOne(() => Commune, { eager: false, nullable: false })
  @JoinColumn({ name: 'departure_commune_id', referencedColumnName: 'id_commune' })
  departure_commune!: Commune;

  @ManyToOne(() => Commune, { eager: false, nullable: false })
  @JoinColumn({ name: 'arrival_commune_id', referencedColumnName: 'id_commune' })
  arrival_commune!: Commune;

  @Column({ name: 'id_users' })
  id_users!: number;

  @Column({ name: 'id_events' })
  id_events!: number;

  @ManyToOne(() => Users, { eager: false, nullable: false })
  @JoinColumn({ name: 'id_users', referencedColumnName: 'id' })
  user!: Users;

  @ManyToOne(() => Event, { eager: false, nullable: false })
  @JoinColumn({ name: 'id_events', referencedColumnName: 'id_events' })
  event!: Event;

  @OneToMany(() => ReservationRide, (reservation) => reservation.ride)
  reservations!: ReservationRide[];
}
