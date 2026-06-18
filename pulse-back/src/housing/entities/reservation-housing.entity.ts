import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Housing } from './housing.entity';
import { Users } from '../../users/entities/user.entity';

@Entity({ name: 'reservation_housing' })
export class ReservationHousing {
  @ApiProperty({ description: 'Identifiant unique de la réservation', example: 1 })
  @PrimaryGeneratedColumn({ name: 'id_reserv_housing' })
  id_reserv_housing!: number;

  @ApiProperty({ description: 'Nombre de places réservées', example: 2 })
  @Column({ name: 'places_reserved', nullable: true })
  places_reserved!: number;

  @ApiProperty({ description: 'Statut de la réservation', example: 'pending' })
  @Column({
    name: 'status',
    type: 'enum',
    enum: ['pending', 'confirmed', 'cancelled'],
    default: 'pending',
  })
  status!: 'pending' | 'confirmed' | 'cancelled';

  @ApiProperty({ description: 'Date d\'arrivée', example: '2025-12-25', required: false })
  @Column({ name: 'arrival_date', type: 'date', nullable: true })
  arrival_date!: Date;

  @ApiProperty({ description: 'Date de départ', example: '2025-12-30', required: false })
  @Column({ name: 'departure_date', type: 'date', nullable: true })
  departure_date!: Date;

  @ApiProperty({ description: 'Identifiant du logement', example: 1 })
  @Column({ name: 'id_housing' })
  id_housing!: number;

  @ApiProperty({ description: 'Identifiant de l\'utilisateur', example: 1 })
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
