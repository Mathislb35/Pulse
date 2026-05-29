import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'commune' })
export class Commune {
  @PrimaryGeneratedColumn({ name: 'id' })
  id!: number;

  @Column({ name: 'insee_code', length: 10, nullable: true })
  insee_code!: string;

  @Column({ name: 'name', length: 50, nullable: true })
  name!: string;

  @Column({ name: 'latitude', type: 'decimal', precision: 9, scale: 6 })
  latitude!: number;

  @Column({ name: 'longitude', type: 'decimal', precision: 9, scale: 6 })
  longitude!: number;

  @Column({ name: 'postal_code', length: 10 })
  postal_code!: string;
}
