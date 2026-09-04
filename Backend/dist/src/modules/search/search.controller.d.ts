import { SearchService } from "./search.service";
export declare class SearchController {
    private readonly searchService;
    constructor(searchService: SearchService);
    search(query: string): Promise<{
        products: {
            id: string;
            sku: string;
            name: string;
            category: string;
            metal: import(".prisma/client").$Enums.MetalType;
            purity: string;
            grossWeight: string;
            netWeight: string;
            price: number;
            stock: number;
            image: string;
            active: boolean;
            createdAt: Date;
            updatedAt: Date;
        }[];
        orders: ({
            items: ({
                product: {
                    id: string;
                    sku: string;
                    name: string;
                    category: string;
                    metal: import(".prisma/client").$Enums.MetalType;
                    purity: string;
                    grossWeight: string;
                    netWeight: string;
                    price: number;
                    stock: number;
                    image: string;
                    active: boolean;
                    createdAt: Date;
                    updatedAt: Date;
                };
            } & {
                id: string;
                price: number;
                orderId: string;
                productId: string;
                quantity: number;
            })[];
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            orderNumber: string;
            userId: string | null;
            customerEmail: string;
            customerPhone: string;
            totalAmount: number;
            gstAmount: number;
            itemsCount: number;
            status: import(".prisma/client").$Enums.OrderStatus;
            paymentStatus: import(".prisma/client").$Enums.PaymentStatus;
        })[];
        customers: {
            id: string;
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
