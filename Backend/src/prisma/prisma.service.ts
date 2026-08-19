import { Injectable, OnModuleInit, OnModuleDestroy } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  async onModuleInit() {
    try {
      await this.$connect();
      console.log("✔ PostgreSQL database connection established via Prisma Client.");
    } catch (err) {
      console.warn("⚠ PostgreSQL connection pending or running in offline mode:", err);
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
