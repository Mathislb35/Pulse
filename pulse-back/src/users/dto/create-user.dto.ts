import { IsString, IsNotEmpty, MinLength, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: 'Nom de l\'utilisateur', example: 'Jean Dupont' })
  @IsString()
  @IsNotEmpty({ message: "Le nom d'utilisateur est requis" })
  nom!: string;

  @ApiProperty({ description: 'Mot de passe (minimum 8 caractères)', example: 'password123' })
  @IsString()
  @IsNotEmpty({ message: 'Le mot de passe est requis' })
  @MinLength(8, { message: 'Le mot de passe doit faire au moins 8 caractères' })
  password!: string;

  @ApiProperty({ description: 'Email de l\'utilisateur', example: 'jean.dupont@email.com' })
  @IsEmail({}, { message: "Email invalide" })
  @IsNotEmpty({ message: "L'email est requis" })
  email!: string;

  @ApiProperty({ description: 'Numéro de téléphone', example: '0612345678', required: false })
  @IsString()
  phone?: string;
}