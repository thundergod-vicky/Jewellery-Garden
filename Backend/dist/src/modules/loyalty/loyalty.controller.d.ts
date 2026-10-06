import { LoyaltyService } from "./loyalty.service";
export declare class LoyaltyController {
    private readonly loyaltyService;
    constructor(loyaltyService: LoyaltyService);
    getProfile(customerId: string): Promise<{
        superPearls: number;
        transactions: {
            id: string;
            description: string;
            createdAt: Date;
            orderId: string | null;
            customerId: string;
            amount: number;
            type: string;
        }[];
    }>;
}
