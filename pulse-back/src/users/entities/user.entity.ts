import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Users {
    @PrimaryGeneratedColumn({ name: 'id_users' })
    id!: number;

    @Column({ name: 'nom' })
    nom!: string;

    @Column({ name: 'email', unique: true, length: 190 })
    email!: string;

    @Column({ name: 'password_hash' })
    password_hash!: string;

    @Column({ name: 'phone', nullable: true })
    phone!: string;
}