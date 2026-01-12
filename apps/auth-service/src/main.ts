import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import * as dotenv from 'dotenv';
import { resolve } from 'path';
import './env-setup';
// 1. Explicitly Root Env aur App Env dono try karein
dotenv.config({ path: resolve(process.cwd(), '.env') }); // Root
dotenv.config({ path: resolve(process.cwd(), 'apps/auth-service/.env') }); // App specific

async function bootstrap() {
  // Debug Log
  console.log('------------------------------------------------');
  console.log('🔍 FINAL DATABASE_URL:', process.env.DATABASE_URL); 
  console.log('------------------------------------------------');

  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // Extra fields ko remove kar dega
    forbidNonWhitelisted: true, // Error dega agar extra fields aaye
  }));
  const port = process.env.PORT || 3000;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`,
  );
}

bootstrap();