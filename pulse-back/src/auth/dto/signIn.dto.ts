
import { IsEmail, IsString } from "class-validator"
export class signInDto{
    @IsEmail({}, { message: "Email invalide" })
    email!: string
    @IsString()
    password!: string
}