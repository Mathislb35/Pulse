import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { ConflictException } from '@nestjs/common';
import { UsersService } from './users.service';
import { Users } from './entities/user.entity';

describe('UsersService', () => {
  let service: UsersService;
  let repo: {
    find: jest.Mock;
    findOne: jest.Mock;
    findOneBy: jest.Mock;
    create: jest.Mock;
    save: jest.Mock;
    update: jest.Mock;
    delete: jest.Mock;
  };

  beforeEach(async () => {
    repo = {
      find: jest.fn(),
      findOne: jest.fn(),
      findOneBy: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(Users),
          useValue: repo,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('hashes the password before saving a user', async () => {
    const createUserDto = {
      nom: 'Alice',
      email: 'alice@example.com',
      password: 'password123',
      phone: '0600000000',
    };

    repo.findOne.mockResolvedValue(null);
    repo.create.mockImplementation((user: Partial<Users>) => user);
    repo.save.mockImplementation(async (user: Partial<Users>) => ({
      id: 1,
      ...user,
    }));

    const createdUser = await service.create(createUserDto);

    expect(repo.create).toHaveBeenCalledWith(
      expect.objectContaining({
        nom: createUserDto.nom,
        email: createUserDto.email,
        phone: createUserDto.phone,
      }),
    );
    expect(createdUser.password_hash).not.toBe(createUserDto.password);
    await expect(
      bcrypt.compare(createUserDto.password, createdUser.password_hash),
    ).resolves.toBe(true);
  });

  it('rejects duplicate email addresses', async () => {
    repo.findOne.mockResolvedValue({ id: 1, email: 'alice@example.com' });

    await expect(
      service.create({
        nom: 'Alice',
        email: 'alice@example.com',
        password: 'password123',
        phone: '0600000000',
      }),
    ).rejects.toThrow(ConflictException);
  });
});
