import { IsEnum, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateHousingReservationDto {
  @ApiProperty({ description: 'Nouveau statut de la réservation', example: 'confirmed' })
  @IsEnum(['pending', 'confirmed', 'cancelled'])
  @IsNotEmpty()
  status!: 'pending' | 'confirmed' | 'cancelled';
}
