import { IsInt, IsOptional, IsDateString } from 'class-validator';
import { Type } from 'class-transformer';

export class RideFiltersDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  id_events?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  id_users?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  departure_commune_id?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  arrival_commune_id?: number;

  @IsOptional()
  @IsDateString()
  date?: string;
}
