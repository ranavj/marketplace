import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @GrpcMethod('CatalogService', 'CreateProduct')
  async createProduct(data: any) {
    console.log('📝 Creating Product via gRPC...');
    return this.appService.createProduct(data);
  }

  @GrpcMethod('CatalogService', 'GetProducts')
  async getProducts() {
    console.log('🔍 Fetching Products via gRPC...');
    return this.appService.getProducts();
  }
}