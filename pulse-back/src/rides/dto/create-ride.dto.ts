import { Type } from 'class-transformer';
import {IsDateString,IsInt,IsNotEmpty,IsNumber,IsString,Min,} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRideDto {
  @ApiProperty({ description: 'Heure de départ', example: '2025-12-25T14:00:00Z' })
  @IsDateString()
  departure_time!: string;

  @ApiProperty({ description: 'Prix par siège', example: 15.5 })
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  price!: number;

  @ApiProperty({ description: 'Nombre de sièges disponibles', example: 3 })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  available_seats!: number;

  @ApiProperty({ description: 'Description du covoiturage', example: 'Trajet confortable avec arrêt à la gare' })
  @IsString()
  @IsNotEmpty()
  description!: string;

  @ApiProperty({ description: 'Identifiant de la commune de départ', example: 1 })
  @Type(() => Number)
  @IsInt()
  departure_commune_id!: number;

  @ApiProperty({ description: 'Identifiant de la commune d\'arrivée', example: 2 })
  @Type(() => Number)
  @IsInt()
  arrival_commune_id!: number;

  @ApiProperty({ description: 'Identifiant de l\'événement associé', example: 1 })
  @Type(() => Number)
  @IsInt()
  id_events!: number;
}
