import { Injectable, 
         UnauthorizedException, 
         BadRequestException, 
         ConflictException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

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

  async signUp(nom: string,email: string, password: string, phone: string): Promise<string> {
    if (!nom || !password ||!email || !phone) {
      throw new BadRequestException('Nom, email ou mot de passe requis.');
    }
    const verifyUserName = await this.usersService.findOneByEmail(email);
    if (verifyUserName) {
      throw new ConflictException("Cet email est déjà utilisé.");
    }
    if (password) {
      const saltOrRounds = 10;
      const hash = await bcrypt.hash(password, saltOrRounds);
      await this.usersService.create(nom, email, hash, phone);
      return 'Utilisateur ' + nom + ' créé avec succès.';
    }
    return "Erreur lors de la création de l'utilisateur.";
  }
}
