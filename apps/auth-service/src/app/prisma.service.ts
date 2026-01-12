import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { PrismaClient } from '@marketplace/auth-db';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PrismaService.name);

  constructor() {
    // 1. Force Load .env file (Zaroori hai)
    const envPath = resolve(process.cwd(), 'apps/auth-service/.env');
    dotenv.config({ path: envPath });

    const connectionString = process.env.DATABASE_URL;

    // 2. Debug Log: Terminal mein check karein ki kya print hota hai
    if (!connectionString) {
      console.error('❌ CRITICAL ERROR: DATABASE_URL is undefined!');
    } else {
      // Password hide karke URL print karein
      console.log('🔌 DEBUG: DB Connecting to:', connectionString.replace(/:([^@]+)@/, ':****@'));
    }

    // 3. Connection Pool Setup
    const pool = new Pool({ connectionString });
    const adapter = new PrismaPg(pool);

    super({ adapter });
  }

  async onModuleInit() {
    await this.$connect();
    this.logger.log('✅ Connected to Database Successfully');
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}