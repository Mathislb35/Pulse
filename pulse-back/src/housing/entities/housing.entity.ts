import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Event } from '../../events/entities/event.entity';
import { ReservationHousing } from './reservation-housing.entity';

@Entity({ name: 'housing' })
export class Housing {
  @PrimaryGeneratedColumn({ name: 'id_housing' })
  id_housing!: number;

  @Column({ name: 'available_places' })
  available_places!: number;

  @Column({ name: 'price', type: 'decimal', precision: 10, scale: 2 })
  price!: number;

  @Column({ name: 'description', type: 'text', nullable: true })
  description!: string;

  @Column({ name: 'id_events' })
  id_events!: number;

  @ManyToOne(() => Event, { eager: false, nullable: false })
  @JoinColumn({ name: 'id_events', referencedColumnName: 'id_events' })
  event!: Event;

  @OneToMany(() => ReservationHousing, (reservation) => reservation.housing)
  reservations!: ReservationHousing[];
}
