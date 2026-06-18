
import { IsEmail, IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class signInDto {
    @ApiProperty({ description: 'Email de l\'utilisateur', example: 'jean.dupont@email.com' })
    @IsEmail({}, { message: "Email invalide" })
    email!: string;

    @ApiProperty({ description: 'Mot de passe de l\'utilisateur', example: 'password123' })
    @IsString()
    password!: string;
}