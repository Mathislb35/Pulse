import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Users } from '../../users/entities/user.entity';
import { Commune } from '../../communes/entities/commune.entity';

@Entity({ name: 'events' })
export class Event {
  @PrimaryGeneratedColumn({ name: 'id_events' })
  id_events!: number;

  @Column({ name: 'title', length: 100 })
  title!: string;

  @Column({ name: 'description', type: 'text', nullable: true })
  description!: string;

  @Column({ name: 'location', type: 'text', nullable: true })
  location!: string;

  @Column({ name: 'category', length: 50, nullable: true })
  category!: string;

  @Column({ name: 'image_url', type: 'text', nullable: true })
  image_url!: string;

  @Column({ name: 'start_date', type: 'datetime' })
  start_date!: Date;

  @Column({ name: 'end_date', type: 'datetime' })
  end_date!: Date;

  @Column({ name: 'id_commune' })
  id_commune!: number;

  @ManyToOne(() => Commune, { eager: false, nullable: false })
  @JoinColumn({ name: 'id_commune', referencedColumnName: 'id' })
  commune!: Commune;

  @Column({ name: 'organizerId', nullable: true })
  organizerId!: number;

  @ManyToOne(() => Users, { eager: false, nullable: true })
  @JoinColumn({ name: 'organizerId', referencedColumnName: 'id' })
  organizer!: Users;
}
