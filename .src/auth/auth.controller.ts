import { Controller, Post, Body, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() body: any) {
    if (!body.email || !body.password || !body.name) {
      throw new BadRequestException('Email, password, and name are required');
    }
    return this.authService.register(body.email, body.password, body.name);
  }

  @Post('login')
  async login(@Body() body: any) {
    if (!body.email || !body.password) {
      throw new BadRequestException('Email and password are required');
    }
    const user = await this.authService.validateUser(body.email, body.password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.authService.login(user);
  }
}
