import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Event } from '../../events/entities/event.entity';
import { ReservationHousing } from './reservation-housing.entity';

@Entity({ name: 'housing' })
export class Housing {
  @ApiProperty({ description: 'Identifiant unique du logement', example: 1 })
  @PrimaryGeneratedColumn({ name: 'id_housing' })
  id_housing!: number;

  @ApiProperty({ description: 'Nombre de places disponibles', example: 4 })
  @Column({ name: 'available_places' })
  available_places!: number;

  @ApiProperty({ description: 'Prix par nuit', example: 50 })
  @Column({ name: 'price', type: 'decimal', precision: 10, scale: 2 })
  price!: number;

  @ApiProperty({ description: 'Description du logement', example: 'Chambre privée avec vue sur la montagne', required: false })
  @Column({ name: 'description', type: 'text', nullable: true })
  description!: string;

  @ApiProperty({ description: 'Identifiant de l\'événement associé', example: 1 })
  @Column({ name: 'id_events' })
  id_events!: number;

  @ManyToOne(() => Event, { eager: false, nullable: false })
  @JoinColumn({ name: 'id_events', referencedColumnName: 'id_events' })
  event!: Event;

  @OneToMany(() => ReservationHousing, (reservation) => reservation.housing)
  reservations!: ReservationHousing[];
}
