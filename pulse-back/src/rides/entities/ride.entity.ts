import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Ride {
    @PrimaryGeneratedColumn()
    id_rides: number;

    @Column()
    depature_time: Date;

    @Column()
    price: number;

    @Column()
    available_seats: number;

    @Column()
    description: string;

    @Column()
    departure_commune_id: number;

    @Column()
    arrival_commune_id: number;

    @Column()
    id_users: number;

    @Column()
    id_events: number;
}
