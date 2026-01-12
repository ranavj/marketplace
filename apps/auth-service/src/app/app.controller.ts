import { Body, Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateUserDto } from './dto/create-user.dto'; // ✅ DTO Import kiya
import { LoginDto } from './dto/login.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getData() {
    return this.appService.getData();
  }

  @Post('register')
  async register(@Body() body: CreateUserDto) {
    return this.appService.createUser(body);
  }

  @HttpCode(HttpStatus.OK) // Default 201 hota hai, Login ke liye 200 OK better hai
  @Post('login')
  async login(@Body() body: LoginDto) {
    return this.appService.login(body);
  }

  @Get('users')
  async getUsers() {
    return this.appService.getUsers();
  }
}