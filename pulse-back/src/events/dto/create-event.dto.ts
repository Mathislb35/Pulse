import { IsDateString, IsInt, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEventDto {
  @ApiProperty({ description: 'Titre de l\'événement', example: 'Festival de musique' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  title!: string;

  @ApiProperty({ description: 'Description de l\'événement', example: 'Un festival incroyable avec des artistes locaux', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ description: 'Lieu de l\'événement', example: 'Place de la République, Paris', required: false })
  @IsString()
  @IsOptional()
  location?: string;

  @ApiProperty({ description: 'Catégorie de l\'événement', example: 'Musique', required: false })
  @IsString()
  @IsOptional()
  @MaxLength(50)
  category?: string;

  @ApiProperty({ description: 'URL de l\'image de l\'événement', example: 'https://example.com/image.jpg', required: false })
  @IsString()
  @IsOptional()
  image_url?: string;

  @ApiProperty({ description: 'Date de début de l\'événement', example: '2025-12-25T18:00:00Z' })
  @IsDateString()
  @IsNotEmpty()
  start_date!: string;

  @ApiProperty({ description: 'Date de fin de l\'événement', example: '2025-12-25T23:00:00Z' })
  @IsDateString()
  @IsNotEmpty()
  end_date!: string;

  @ApiProperty({ description: 'Identifiant de la commune', example: 1 })
  @Type(() => Number)
  @IsInt()
  @IsNotEmpty()
  id_commune!: number;

  @ApiProperty({ description: 'Identifiant de l\'organisateur', example: 1, required: false })
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  organizerId?: number;
}
