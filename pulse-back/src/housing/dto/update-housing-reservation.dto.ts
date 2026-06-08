import { IsEnum, IsNotEmpty } from 'class-validator';

export class UpdateHousingReservationDto {
  @IsEnum(['pending', 'confirmed', 'cancelled'])
  @IsNotEmpty()
  status!: 'pending' | 'confirmed' | 'cancelled';
}
