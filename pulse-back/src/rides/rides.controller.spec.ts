import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { RidesController } from './rides.controller';
import { RidesService } from './rides.service';
import { ReservationRide } from './entities/reservation-ride.entity';
import { Ride } from './entities/ride.entity';

describe('RidesController', () => {
  let controller: RidesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RidesController],
      providers: [
        RidesService,
        {
          provide: getRepositoryToken(Ride),
          useValue: {},
        },
        {
          provide: getRepositoryToken(ReservationRide),
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<RidesController>(RidesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
