import { Module } from '@nestjs/common';    
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { EventsModule } from './events/events.module';
import { RidesModule } from './rides/rides.module';
import { MessagesModule } from './messages/messages.module';
import { HousingModule } from './housing/housing.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT!),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      autoLoadEntities: true,
      synchronize: false,
    }),
    UsersModule, 
    EventsModule, 
    RidesModule, 
    MessagesModule, 
    HousingModule, 
    AuthModule],
  
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
