import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import * as dotenv from 'dotenv';
import { resolve } from 'path';
import { HttpExceptionFilter } from './http-exception.filter';

// Load Env
dotenv.config({ path: resolve(process.cwd(), 'apps/api-gateway/.env') });

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // CORS Enable karein (Frontend ke liye zaroori hai)
  app.enableCors();
  app.useGlobalFilters(new HttpExceptionFilter());
  const PORT = process.env.PORT || 8000;

  // ❌ OLD PROXY CODE REMOVED
  // Ab hum 'createProxyMiddleware' use nahi kar rahe.
  // Humara updated 'AppController' ab requests handle karega aur gRPC call karega.

  await app.listen(PORT);
  Logger.log(`🚀 API Gateway running on: http://localhost:${PORT}`);
}

bootstrap();