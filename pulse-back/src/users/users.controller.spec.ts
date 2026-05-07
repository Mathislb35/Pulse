import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;
  let usersService: { create: jest.Mock };

  beforeEach(async () => {
    usersService = {
      create: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: usersService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('passes the dto directly to the service', async () => {
    const createUserDto = {
      nom: 'Alice',
      email: 'alice@example.com',
      password: 'password123',
      phone: '0600000000',
    };
    usersService.create.mockResolvedValue({ id: 1, ...createUserDto });

    await controller.create(createUserDto);

    expect(usersService.create).toHaveBeenCalledWith(createUserDto);
  });
});
