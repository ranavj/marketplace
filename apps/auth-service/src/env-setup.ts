import * as dotenv from 'dotenv';
import { resolve } from 'path';

// Root env
dotenv.config({ path: resolve(process.cwd(), '.env') });
// App env
dotenv.config({ path: resolve(process.cwd(), 'apps/auth-service/.env') });

console.log('✅ Env Loaded. DB URL:', process.env.DATABASE_URL);