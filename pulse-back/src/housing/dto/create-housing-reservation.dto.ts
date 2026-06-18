import { Type } from 'class-transformer';
import { IsDate, IsInt, IsNotEmpty, IsOptional, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateHousingReservationDto {
  @ApiProperty({ description: 'Nombre de places à réserver', example: 2 })
  @IsInt()
  @Min(1)
  @IsNotEmpty()
  places_reserved!: number;

  @ApiProperty({ description: 'Date d\'arrivée', example: '2025-12-25', required: false })
  @Type(() => Date)
  @IsDate()
  @IsOptional()
  arrival_date?: Date;

  @ApiProperty({ description: 'Date de départ', example: '2025-12-30', required: false })
  @Type(() => Date)
  @IsDate()
  @IsOptional()
  departure_date?: Date;
}
