import { Test, TestingModule } from '@nestjs/testing';
import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';

describe('AuthService', () => {
  let service: AuthService;
  let usersService: {
    findOneByEmail: jest.Mock;
    create: jest.Mock;
  };
  let jwtService: {
    signAsync: jest.Mock;
  };

  beforeEach(async () => {
    usersService = {
      findOneByEmail: jest.fn(),
      create: jest.fn(),
    };
    jwtService = {
      signAsync: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: usersService,
        },
        {
          provide: JwtService,
          useValue: jwtService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('returns an access token when credentials are valid', async () => {
    const password = 'password123';
    const passwordHash = await bcrypt.hash(password, 10);
    usersService.findOneByEmail.mockResolvedValue({
      id: 1,
      email: 'alice@example.com',
      password_hash: passwordHash,
    });
    jwtService.signAsync.mockResolvedValue('signed-token');

    await expect(
      service.signIn('alice@example.com', password),
    ).resolves.toEqual({
      access_token: 'signed-token',
    });
  });

  it('rejects invalid credentials', async () => {
    const passwordHash = await bcrypt.hash('password123', 10);
    usersService.findOneByEmail.mockResolvedValue({
      id: 1,
      email: 'alice@example.com',
      password_hash: passwordHash,
    });

    await expect(
      service.signIn('alice@example.com', 'wrong-password'),
    ).rejects.toThrow(UnauthorizedException);
  });

  it('creates a user during sign up', async () => {
    usersService.create.mockResolvedValue({ id: 1, email: 'alice@example.com' });

    await expect(
      service.signUp('Alice', 'alice@example.com', 'password123', '0600000000'),
    ).resolves.toBe('Utilisateur Alice créé avec succès.');

    expect(usersService.create).toHaveBeenCalledWith({
      nom: 'Alice',
      email: 'alice@example.com',
      password: 'password123',
      phone: '0600000000',
    });
  });
});
