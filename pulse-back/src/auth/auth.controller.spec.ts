import { Test, TestingModule } from '@nestjs/testing';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: {
    signIn: jest.Mock;
    signUp: jest.Mock;
  };

  beforeEach(async () => {
    authService = {
      signIn: jest.fn(),
      signUp: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: authService,
        },
        {
          provide: AuthGuard,
          useValue: {
            canActivate: jest.fn().mockReturnValue(true),
          },
        },
        {
          provide: JwtService,
          useValue: {
            verifyAsync: jest.fn(),
          },
        },
        {
          provide: Reflector,
          useValue: {
            getAllAndOverride: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('forwards login requests to the auth service', async () => {
    authService.signIn.mockResolvedValue({ access_token: 'signed-token' });

    await controller.signIn({
      email: 'alice@example.com',
      password: 'password123',
    });

    expect(authService.signIn).toHaveBeenCalledWith(
      'alice@example.com',
      'password123',
    );
  });

  it('forwards register requests to the auth service', async () => {
    authService.signUp.mockResolvedValue('Utilisateur Alice créé avec succès.');

    await controller.signUp({
      nom: 'Alice',
      email: 'alice@example.com',
      password: 'password123',
      phone: '0600000000',
    });

    expect(authService.signUp).toHaveBeenCalledWith(
      'Alice',
      'alice@example.com',
      'password123',
      '0600000000',
    );
  });
});
