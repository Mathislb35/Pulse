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
import { ApiProperty } from '@nestjs/swagger';
import { ReservationRide } from './reservation-ride.entity';

@Entity({ name: 'rides' })
@Index('idx_rides_departure_commune', ['departure_commune_id'])
@Index('idx_rides_arrival_commune', ['arrival_commune_id'])
@Index('idx_rides_user', ['id_users'])
@Index('idx_rides_event', ['id_events'])
export class Ride {
  @ApiProperty({ description: 'Identifiant unique du covoiturage', example: 1 })
  @PrimaryGeneratedColumn({ name: 'id_rides' })
  id_rides!: number;

  @ApiProperty({ description: 'Heure de départ', example: '2025-12-25T14:00:00Z' })
  @Column({ name: 'departure_time', type: 'datetime' })
  departure_time!: Date;

  @ApiProperty({ description: 'Prix par siège', example: 15.5 })
  @Column({ name: 'price' })
  price!: number;

  @ApiProperty({ description: 'Nombre de sièges disponibles', example: 3 })
  @Column({ name: 'available_seats' })
  available_seats!: number;

  @ApiProperty({ description: 'Description du covoiturage', example: 'Trajet confortable avec arrêt à la gare' })
  @Column({ name: 'description' })
  description!: string;

  @ApiProperty({ description: 'Identifiant de la commune de départ', example: 1 })
  @Column({ name: 'departure_commune_id' })
  departure_commune_id!: number;

  @ApiProperty({ description: 'Identifiant de la commune d\'arrivée', example: 2 })
  @Column({ name: 'arrival_commune_id' })
  arrival_commune_id!: number;

  @ManyToOne(() => Commune, { eager: false, nullable: false })
  @JoinColumn({ name: 'departure_commune_id', referencedColumnName: 'id_commune' })
  departure_commune!: Commune;

  @ManyToOne(() => Commune, { eager: false, nullable: false })
  @JoinColumn({ name: 'arrival_commune_id', referencedColumnName: 'id_commune' })
  arrival_commune!: Commune;

  @ApiProperty({ description: 'Identifiant du conducteur', example: 1 })
  @Column({ name: 'id_users' })
  id_users!: number;

  @ApiProperty({ description: 'Identifiant de l\'événement associé', example: 1 })
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
