import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'commune' })
export class Commune {
  @ApiProperty({ description: 'Identifiant unique de la commune', example: 1 })
  @PrimaryGeneratedColumn({ name: 'id_commune' })
  id_commune!: number;

  @ApiProperty({ description: 'Nom de la commune', example: 'Paris', required: false })
  @Column({ name: 'name', length: 50, nullable: true })
  name!: string;

  @ApiProperty({ description: 'Latitude de la commune', example: 48.8566 })
  @Column({ name: 'latitude', type: 'decimal', precision: 9, scale: 6 })
  latitude!: number;

  @ApiProperty({ description: 'Longitude de la commune', example: 2.3522 })
  @Column({ name: 'longitude', type: 'decimal', precision: 9, scale: 6 })
  longitude!: number;

  @ApiProperty({ description: 'Code postal de la commune', example: '75000' })
  @Column({ name: 'postal_code', length: 10 })
  postal_code!: string;
}
