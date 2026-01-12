import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join, resolve } from 'path';
import * as dotenv from 'dotenv';
import './env-setup';
import { GrpcExceptionFilter } from './app/grpc-exception.filter';

dotenv.config({ path: resolve(process.cwd(), '.env') });
dotenv.config({ path: resolve(process.cwd(), 'apps/auth-service/.env') });

async function bootstrap() {
  console.log('------------------------------------------------');
  console.log('🔍 FINAL DATABASE_URL:', process.env.DATABASE_URL); 
  console.log('------------------------------------------------');

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.GRPC,
    options: {
      package: 'auth',
      protoPath: join(process.cwd(), 'libs/shared/auth-proto/src/auth.proto'),
      url: '0.0.0.0:50051',
    },
  });

  // ✅ Register Global Filter HERE
  app.useGlobalFilters(new GrpcExceptionFilter());

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, 
    forbidNonWhitelisted: true, 
  }));

  await app.listen();
  Logger.log('🚀 Auth Microservice is listening on gRPC Port 50051');
}

bootstrap();