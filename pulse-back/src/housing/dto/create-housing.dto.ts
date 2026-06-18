import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateHousingDto {
  @ApiProperty({ description: 'Nombre de places disponibles', example: 4 })
  @IsInt()
  @Min(1)
  @IsNotEmpty()
  available_places!: number;

  @ApiProperty({ description: 'Prix par nuit', example: 50 })
  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  price!: number;

  @ApiProperty({ description: 'Description du logement', example: 'Chambre privée avec vue sur la montagne', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ description: 'Identifiant de l\'événement associé', example: 1 })
  @IsInt()
  @IsNotEmpty()
  id_events!: number;
}
