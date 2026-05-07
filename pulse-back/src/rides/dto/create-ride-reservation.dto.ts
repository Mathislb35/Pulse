import { Type } from 'class-transformer';
import { IsInt, Min } from 'class-validator';

export class CreateRideReservationDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  seats_reserved!: number;
}
