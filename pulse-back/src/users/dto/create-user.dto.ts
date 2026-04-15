import { IsString, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty({ message: "Le nom d'utilisateur est requis" })
  nom!: string;

  @IsString()
  @IsNotEmpty({ message: 'Le mot de passe est requis' })
  @MinLength(8, { message: 'Le mot de passe doit faire au moins 8 caractères' })
  password!: string;
  
  @IsString()
  @IsNotEmpty({ message: "L'email est requis" })
  email!: string;

  @IsString()
  @IsNotEmpty({ message: "Le numéro de téléphone est requis" })
  phone!: string;
}