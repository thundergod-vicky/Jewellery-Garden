import { PrismaService } from "../../prisma/prisma.service";
export declare class LoyaltyService {
    private prisma;
    constructor(prisma: PrismaService);
    getLoyaltyProfile(customerId: string): Promise<{
        superPearls: number;
        transactions: {
            id: string;
            createdAt: Date;
            orderId: string | null;
            description: string;
            customerId: string;
            amount: number;
            type: string;
        }[];
    }>;
}
