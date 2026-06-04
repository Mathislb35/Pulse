import { Injectable, 
         UnauthorizedException, 
         BadRequestException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    email: string,
    password: string,
  ): Promise<{ access_token: string }> {
    const user = await this.usersService.findOneByEmail(email);
    if (!user) {
      throw new UnauthorizedException("L'utilisateur n'existe pas");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Mot de passe incorrect');
    }
    const payload = { id: user.id, email: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signUp(nom: string, email: string, password: string, phone?: string): Promise<string> {
    if (!nom || !password || !email) {
      throw new BadRequestException('Nom, email et mot de passe sont requis.');
    }

    const userToCreate: CreateUserDto = {
      nom,
      email,
      password,
      phone,
    };

    await this.usersService.create(userToCreate);
    return 'Utilisateur ' + nom + ' créé avec succès.';
  }
}
