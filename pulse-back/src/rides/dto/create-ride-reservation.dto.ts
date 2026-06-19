import { Type } from 'class-transformer';
import { IsInt, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRideReservationDto {
  @ApiProperty({ description: 'Nombre de sièges à réserver', example: 2 })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  seats_reserved!: number;
}
