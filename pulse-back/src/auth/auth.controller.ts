import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { Public } from './public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('login')
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @Public()
  @Post('register')
  signUp(@Body() signUpDto: Record<string, any>) {
    return this.authService.signUp(signUpDto.nom, signUpDto.email, signUpDto.password, signUpDto.phone);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req:any) {
    return req.user;
  }
  
}
