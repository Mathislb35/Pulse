import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { RidesService } from './rides.service';
import { ReservationRide } from './entities/reservation-ride.entity';
import { Ride } from './entities/ride.entity';

describe('RidesService', () => {
  let service: RidesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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

    service = module.get<RidesService>(RidesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
