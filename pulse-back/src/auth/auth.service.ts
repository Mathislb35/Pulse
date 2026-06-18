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

  // Note: signUp is now just a wrapper, but better to use the controller directly with CreateUserDto
  async signUp(nom: string, prenom: string, username: string, email: string, password: string, phone?: string, date_de_naissance?: string): Promise<string> {
    if (!nom || !prenom || !username || !password || !email) {
      throw new BadRequestException('Nom, prénom, nom d\'utilisateur, email et mot de passe sont requis.');
    }

    const userToCreate: CreateUserDto = {
      nom,
      prenom,
      username,
      email,
      password,
      phone,
      date_de_naissance,
    };

    await this.usersService.create(userToCreate);
    return 'Utilisateur ' + nom + ' créé avec succès.';
  }
}
