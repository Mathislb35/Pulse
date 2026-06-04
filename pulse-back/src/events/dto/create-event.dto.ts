import { IsDateString, IsInt, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateEventDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  title!: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  location?: string;

  @IsString()
  @IsOptional()
  @MaxLength(50)
  category?: string;

  @IsString()
  @IsOptional()
  image_url?: string;

  @IsDateString()
  @IsNotEmpty()
  start_date!: string;

  @IsDateString()
  @IsNotEmpty()
  end_date!: string;

  @Type(() => Number)
  @IsInt()
  @IsNotEmpty()
  id_commune!: number;

  @Type(() => Number)
  @IsInt()
  @IsOptional()
  organizerId?: number;
}
