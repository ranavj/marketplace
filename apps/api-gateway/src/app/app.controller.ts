import { Controller, Get, Post, Body, Inject, OnModuleInit, UseGuards, Request } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { map, Observable } from 'rxjs';
import { AppService } from './app.service';
import { AuthGuard } from '../auth.guard'; // ✅ 1. Import AuthGuard (Make sure file exists)

interface AuthService {
  register(data: any): Observable<any>;
  login(data: any): Observable<any>;
}

interface CatalogService {
  createProduct(data: any): Observable<any>;
  getProducts(data: any): Observable<any>;
}

@Controller()
export class AppController implements OnModuleInit {
  private authService: AuthService;
  private catalogService: CatalogService;

  constructor(
    private readonly appService: AppService,
    @Inject('AUTH_PACKAGE') private authClient: ClientGrpc,
    @Inject('CATALOG_PACKAGE') private catalogClient: ClientGrpc
  ) {}

  onModuleInit() {
    this.authService = this.authClient.getService<AuthService>('AuthService');
    this.catalogService = this.catalogClient.getService<CatalogService>('CatalogService');
  }

  // --- Auth Routes (Public) ---
  @Post('auth/register')
  register(@Body() body: any) {
    return this.authService.register(body);
  }

  @Post('auth/login')
  login(@Body() body: any) {
    return this.authService.login(body).pipe(
      map((response) => {
        // 👇 DEBUG LOG: Dekhte hain Gateway ke paas kya pahuncha
        console.log('🔍 Gateway Login Response:', response);
        return response;
      })
    );
  }

  // --- Catalog Routes ---
  
  // ✅ 2. Security Applied: Sirf Logged-in User hi access kar sakta hai
  @UseGuards(AuthGuard)
  @Post('products')
  createProduct(@Body() body: any, @Request() req: any) {
    // Hum dekh sakte hain kaun product bana raha hai (req.user set by AuthGuard)
    console.log('🔒 User creating product:', req.user?.id);
    
    return this.catalogService.createProduct(body);
  }

  // Public Route (Sab dekh sakte hain)
  @Get('products')
  getProducts() {
    return this.catalogService.getProducts({});
  }
}