import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@marketplace/auth-db';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    // 1. Connection String Environment se lein
    const connectionString = process.env.DATABASE_URL;

    // 2. Postgres Pool Banayein
    const pool = new Pool({ connectionString });
    
    // 3. Prisma Adapter Create karein
    const adapter = new PrismaPg(pool);

    // 4. Super call mein 'adapter' pass karein (Yehi Prisma 7 maang raha hai)
    super({ adapter });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}