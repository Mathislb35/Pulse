import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { Event } from './entities/event.entity';
import { Commune } from '../communes/entities/commune.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Event,Commune])],
  controllers: [EventsController],
  providers: [EventsService],
})
export class EventsModule {}
