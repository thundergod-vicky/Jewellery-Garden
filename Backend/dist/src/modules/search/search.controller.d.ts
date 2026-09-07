import { SearchService } from "./search.service";
export declare class SearchController {
    private readonly searchService;
    constructor(searchService: SearchService);
    search(query: string): Promise<{
        products: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            price: number;
            sku: string;
            category: string;
            metal: import(".prisma/client").$Enums.MetalType;
            purity: string;
            grossWeight: string;
            netWeight: string;
            stoneWeight: string | null;
            tokenNumber: string | null;
            makingCharges: string | null;
            otherCharges: string | null;
            description: string | null;
            modelNumber: string | null;
            stock: number;
            image: string;
            active: boolean;
        }[];
        orders: ({
            items: ({
                product: {
                    id: string;
                    createdAt: Date;
                    updatedAt: Date;
                    name: string;
                    price: number;
                    sku: string;
                    category: string;
                    metal: import(".prisma/client").$Enums.MetalType;
                    purity: string;
                    grossWeight: string;
                    netWeight: string;
                    stoneWeight: string | null;
                    tokenNumber: string | null;
                    makingCharges: string | null;
                    otherCharges: string | null;
                    description: string | null;
                    modelNumber: string | null;
                    stock: number;
                    image: string;
                    active: boolean;
                };
            } & {
                id: string;
                orderId: string;
                productId: string;
                quantity: number;
                price: number;
            })[];
        } & {
            id: string;
            orderNumber: string;
            userId: string | null;
            customerEmail: string;
            customerPhone: string;
            panCard: string | null;
            aadharCard: string | null;
            totalAmount: number;
            gstAmount: number;
            itemsCount: number;
            status: import(".prisma/client").$Enums.OrderStatus;
            paymentStatus: import(".prisma/client").$Enums.PaymentStatus;
            createdAt: Date;
            updatedAt: Date;
        })[];
        customers: {
            id: string;
            panCard: string | null;
            aadharCard: string | null;
            createdAt: Date;
            updatedAt: Date;
            firebaseId: string;
            email: string;
            username: string;
            phone: string | null;
            addresses: string[];
            savedCards: string | null;
            superPearls: number;
        }[];
    }>;
}
