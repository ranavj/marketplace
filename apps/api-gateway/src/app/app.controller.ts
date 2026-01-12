import { Controller, Get, Post, Body, Inject, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { AppService } from './app.service';

// Interfaces match .proto definitions
interface AuthService {
  register(data: any): Observable<any>;
  login(data: any): Observable<any>;
}

interface CatalogService {
  createProduct(data: any): Observable<any>;
  getProducts(data: any): Observable<any>;
}

@Controller() // Prefix hata diya taaki hum /auth aur /products alag define kar sakein
export class AppController implements OnModuleInit {
  private authService: AuthService;
  private catalogService: CatalogService;

  constructor(
    private readonly appService: AppService,
    @Inject('AUTH_PACKAGE') private authClient: ClientGrpc,
    @Inject('CATALOG_PACKAGE') private catalogClient: ClientGrpc // 👈 Inject Catalog Client
  ) {}

  onModuleInit() {
    this.authService = this.authClient.getService<AuthService>('AuthService');
    // 👇 Initialize Catalog Service
    this.catalogService = this.catalogClient.getService<CatalogService>('CatalogService');
  }

  // --- Auth Routes ---
  @Post('auth/register')
  register(@Body() body: any) {
    return this.authService.register(body);
  }

  @Post('auth/login')
  login(@Body() body: any) {
    return this.authService.login(body);
  }

  // --- 👇 NEW: Catalog Routes ---
  
  @Post('products')
  createProduct(@Body() body: any) {
    return this.catalogService.createProduct(body);
  }

  @Get('products')
  getProducts() {
    return this.catalogService.getProducts({}); // Empty object for Empty message
  }
}