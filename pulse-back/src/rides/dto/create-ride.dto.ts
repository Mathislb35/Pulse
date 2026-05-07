import { Type } from 'class-transformer';
import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
} from 'class-validator';

export class CreateRideDto {
  @IsDateString()
  departure_time!: string;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  price!: number;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  available_seats!: number;

  @IsString()
  @IsNotEmpty()
  description!: string;

  @Type(() => Number)
  @IsInt()
  departure_commune_id!: number;

  @Type(() => Number)
  @IsInt()
  arrival_commune_id!: number;

  @Type(() => Number)
  @IsInt()
  id_events!: number;
}
