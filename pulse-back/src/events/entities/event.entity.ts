import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Users } from '../../users/entities/user.entity';

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

  @Column({ name: 'start_date', type: 'datetime' })
  start_date!: Date;

  @Column({ name: 'end_date', type: 'datetime' })
  end_date!: Date;

  @Column({ name: 'id_commune' })
  id_commune!: number;

  @Column({ name: 'organizerId', nullable: true })
  organizerId!: number;

  @ManyToOne(() => Users, { eager: false, nullable: true })
  @JoinColumn({ name: 'organizerId', referencedColumnName: 'id' })
  organizer!: Users;
}
