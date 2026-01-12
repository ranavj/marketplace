import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as dotenv from 'dotenv';
import { resolve } from 'path';
import { Product, ProductSchema } from './schemas/product.schema';

// Env Load karne ka tareeka (Standard)
dotenv.config({ path: resolve(process.cwd(), 'apps/catalog-service/.env') });

@Module({
  imports: [
    // Database Connection Setup
    MongooseModule.forRoot(process.env.MONGO_URI),
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}