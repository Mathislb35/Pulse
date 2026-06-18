import { IsInt, IsOptional, IsDateString } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class RideFiltersDto {
  @ApiProperty({ description: 'Filtrer par événement', example: 1, required: false })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  id_events?: number;

  @ApiProperty({ description: 'Filtrer par conducteur', example: 1, required: false })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  id_users?: number;

  @ApiProperty({ description: 'Filtrer par commune de départ', example: 1, required: false })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  departure_commune_id?: number;

  @ApiProperty({ description: 'Filtrer par commune d\'arrivée', example: 2, required: false })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  arrival_commune_id?: number;

  @ApiProperty({ description: 'Filtrer par date', example: '2025-12-25', required: false })
  @IsOptional()
  @IsDateString()
  date?: string;
}
