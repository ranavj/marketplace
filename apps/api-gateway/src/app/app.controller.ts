import { Controller, Get, Post, Body, Inject, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { AppService } from './app.service';

// ✅ Interface define kiya taaki TypeScript ko pata ho gRPC service mein kya methods hain
interface AuthService {
  register(data: any): Observable<any>;
  login(data: any): Observable<any>;
}

// ✅ Route Prefix 'auth' kar diya. Ab endpoints honge: /auth/register, /auth/login
@Controller('auth')
export class AppController implements OnModuleInit {
  private authService: AuthService;

  constructor(
    private readonly appService: AppService,
    // 👇 Inject gRPC Client (Jo humne Module mein register kiya tha)
    @Inject('AUTH_PACKAGE') private client: ClientGrpc
  ) {}

  // 👇 Jab Module load ho jaye, tab Service Instance initialize karein
  onModuleInit() {
    this.authService = this.client.getService<AuthService>('AuthService');
  }

  // --- Old Method (Optional) ---
  @Get()
  getData() {
    return this.appService.getData();
  }

  // --- New gRPC Methods ---

  @Post('register')
  register(@Body() body: any) {
    // HTTP Request aayi -> gRPC call kiya -> Response return kiya
    return this.authService.register(body);
  }

  @Post('login')
  login(@Body() body: any) {
    return this.authService.login(body);
  }
}