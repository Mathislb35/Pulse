import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HousingService } from './housing.service';
import { HousingController } from './housing.controller';
import { Housing } from './entities/housing.entity';
import { ReservationHousing } from './entities/reservation-housing.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Housing, ReservationHousing])],
  controllers: [HousingController],
  providers: [HousingService],
})
export class HousingModule {}
