import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices'; // ✅ Import
import { join } from 'path';

@Module({
  imports: [
    // 👇 Register gRPC Client here
    ClientsModule.register([
      {
        name: 'AUTH_PACKAGE', // Dependency Injection Token (Controller me use hoga)
        transport: Transport.GRPC,
        options: {
          package: 'auth', // .proto file ke 'package auth;' se match hona chahiye
          protoPath: join(process.cwd(), 'libs/shared/auth-proto/src/auth.proto'),
          url: '0.0.0.0:50051', // Auth Service ka Address
        },
      },
      {
        name: 'CATALOG_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'catalog', // Match .proto package name
          protoPath: join(process.cwd(), 'libs/shared/catalog-proto/src/catalog.proto'),
          url: '0.0.0.0:50052', // Different Port!
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}