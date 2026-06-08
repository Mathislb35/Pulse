import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class CreateHousingDto {
  @IsInt()
  @Min(1)
  @IsNotEmpty()
  available_places!: number;

  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  price!: number;

  @IsString()
  @IsOptional()
  description?: string;

  @IsInt()
  @IsNotEmpty()
  id_events!: number;
}
