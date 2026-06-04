import { IsEnum, IsNotEmpty } from 'class-validator';

export class UpdateRideReservationDto {
  @IsEnum(['pending', 'confirmed', 'cancelled'])
  @IsNotEmpty()
  status!: 'pending' | 'confirmed' | 'cancelled';
}
