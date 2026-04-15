
import { IsString, Length } from "class-validator"
export class signInDto{
    @IsString({always: true})
    @Length(2,50)
    email!: string
    @IsString({always: true})
    password!: string
}