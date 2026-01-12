import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join, resolve } from 'path';
import * as dotenv from 'dotenv';

dotenv.config({ path: resolve(process.cwd(), 'apps/catalog-service/.env') });

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.GRPC,
    options: {
      package: 'catalog', // Match .proto package
      protoPath: join(process.cwd(), 'libs/shared/catalog-proto/src/catalog.proto'),
      url: '0.0.0.0:50052', // ⚠️ Different Port than Auth
    },
  });

  await app.listen();
  Logger.log('🚀 Catalog Microservice is listening on gRPC Port 50052');
}

bootstrap();