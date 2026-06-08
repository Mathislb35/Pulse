import { Type } from 'class-transformer';
import { IsDate, IsInt, IsNotEmpty, IsOptional, Min } from 'class-validator';

export class CreateHousingReservationDto {
  @IsInt()
  @Min(1)
  @IsNotEmpty()
  places_reserved!: number;

  @Type(() => Date)
  @IsDate()
  @IsOptional()
  arrival_date?: Date;

  @Type(() => Date)
  @IsDate()
  @IsOptional()
  departure_date?: Date;
}
