import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Users } from '../../users/entities/user.entity';
import { Commune } from '../../communes/entities/commune.entity';

@Entity({ name: 'events' })
export class Event {
  @ApiProperty({ description: 'Identifiant unique de l\'événement', example: 1 })
  @PrimaryGeneratedColumn({ name: 'id_events' })
  id_events!: number;

  @ApiProperty({ description: 'Titre de l\'événement', example: 'Festival de musique' })
  @Column({ name: 'title', length: 100 })
  title!: string;

  @ApiProperty({ description: 'Description de l\'événement', example: 'Un festival incroyable avec des artistes locaux', required: false })
  @Column({ name: 'description', type: 'text', nullable: true })
  description!: string;

  @ApiProperty({ description: 'Lieu de l\'événement', example: 'Place de la République, Paris', required: false })
  @Column({ name: 'location', type: 'text', nullable: true })
  location!: string;

  @ApiProperty({ description: 'Catégorie de l\'événement', example: 'Musique', required: false })
  @Column({ name: 'category', length: 50, nullable: true })
  category!: string;

  @ApiProperty({ description: 'URL de l\'image de l\'événement', example: 'https://example.com/image.jpg', required: false })
  @Column({ name: 'image_url', type: 'text', nullable: true })
  image_url!: string;

  @ApiProperty({ description: 'Date de début de l\'événement', example: '2025-12-25T18:00:00Z' })
  @Column({ name: 'start_date', type: 'datetime' })
  start_date!: Date;

  @ApiProperty({ description: 'Date de fin de l\'événement', example: '2025-12-25T23:00:00Z' })
  @Column({ name: 'end_date', type: 'datetime' })
  end_date!: Date;

  @ApiProperty({ description: 'Identifiant de la commune', example: 1 })
  @Column({ name: 'id_commune' })
  id_commune!: number;

  @ManyToOne(() => Commune, { eager: false, nullable: false })
  @JoinColumn({ name: 'id_commune', referencedColumnName: 'id_commune' })
  commune!: Commune;

  @ApiProperty({ description: 'Identifiant de l\'organisateur', example: 1, required: false })
  @Column({ name: 'organizerId', nullable: true })
  organizerId!: number;

  @ManyToOne(() => Users, { eager: false, nullable: true })
  @JoinColumn({ name: 'organizerId', referencedColumnName: 'id' })
  organizer!: Users;
}
