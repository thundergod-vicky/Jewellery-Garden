import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class LoyaltyService {
  constructor(private prisma: PrismaService) {}

  async getLoyaltyProfile(customerId: string) {
    const customer = await this.prisma.customer.findFirst({
      where: {
        OR: [
          { firebaseId: customerId },
          { email: customerId },
        ],
      },
    });

    if (!customer) {
      return { superPearls: 0, transactions: [] };
    }

    const transactions = await this.prisma.superPearlTransaction.findMany({
      where: { customerId: customer.id },
      orderBy: { createdAt: "desc" },
    });

    return {
      superPearls: customer.superPearls,
      transactions,
    };
  }
}
