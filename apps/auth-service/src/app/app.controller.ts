import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices'; // ✅ gRPC Decorator
import { AppService } from './app.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // ❌ 'getData' aur 'getUsers' hata diye hain kyunki wo .proto file mein defined nahi thay.
  // gRPC mein sirf wahi function chalte hain jo .proto contract mein hote hain.

  // ✅ 1. Register Method
  // 'AuthService' = Proto file mein 'service AuthService'
  // 'Register'    = Proto file mein 'rpc Register'
  @GrpcMethod('AuthService', 'Register')
  async register(data: CreateUserDto) {
    // NestJS automatic data map kar dega DTO mein
    return this.appService.createUser(data);
  }

  // ✅ 2. Login Method
  @GrpcMethod('AuthService', 'Login')
  async login(data: LoginDto) {
    return this.appService.login(data);
  }
}