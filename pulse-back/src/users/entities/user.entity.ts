import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Users {
    @ApiProperty({ description: 'Identifiant unique de l\'utilisateur', example: 1 })
    @PrimaryGeneratedColumn({ name: 'id_users' })
    id!: number;

    @ApiProperty({ description: 'Nom de l\'utilisateur', example: 'Dupont' })
    @Column({ name: 'nom' })
    nom!: string;

    @ApiProperty({ description: 'Prénom de l\'utilisateur', example: 'Jean' })
    @Column({ name: 'prenom' })
    prenom!: string;

    @ApiProperty({ description: 'Nom d\'utilisateur', example: 'jean.dupont' })
    @Column({ name: 'username', unique: true, length: 190 })
    username!: string;

    @ApiProperty({ description: 'Email de l\'utilisateur', example: 'jean.dupont@email.com' })
    @Column({ name: 'email', unique: true, length: 190 })
    email!: string;

    @Column({ name: 'password_hash' })
    password_hash!: string;

    @ApiProperty({ description: 'Numéro de téléphone', example: '0612345678', required: false })
    @Column({ name: 'phone', nullable: true })
    phone!: string;

    @ApiProperty({ description: 'Date de naissance', example: '1996-07-14', required: false })
    @Column({ name: 'date_de_naissance', type: 'date', nullable: true })
    date_de_naissance!: Date;
}