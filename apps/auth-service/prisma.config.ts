// apps/auth-service/prisma.config.ts
import path from "node:path";
import dotenv from "dotenv";
import { defineConfig, env } from "prisma/config";

// ✅ Load .env explicitly (repo root se run ho raha hai, isliye root .env pick kar rahe)
dotenv.config({ path: path.resolve(process.cwd(), "apps/auth-service/.env") });
// Agar tumhara .env auth-service me hai, to use this instead:
// dotenv.config({ path: path.resolve(process.cwd(), "apps/auth-service/.env") });

export default defineConfig({
  schema: path.join("prisma", "schema.prisma"),

  migrations: {
    path: path.join("prisma", "migrations"),
  },

  datasource: {
    url: env("DATABASE_URL"),
  },
});
