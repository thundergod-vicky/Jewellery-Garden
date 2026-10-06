import { PrismaService } from "../../prisma/prisma.service";
import { OrderStatus } from "@prisma/client";
export declare class OrdersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<({
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
                stoneWeight: string | null;
                tokenNumber: string | null;
                makingCharges: string | null;
                otherCharges: string | null;
                description: string | null;
                modelNumber: string | null;
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
        panCard: string | null;
        aadharCard: string | null;
        totalAmount: number;
        gstAmount: number;
        itemsCount: number;
        status: import(".prisma/client").$Enums.OrderStatus;
        paymentStatus: import(".prisma/client").$Enums.PaymentStatus;
    })[]>;
    findByCustomer(firebaseId: string): Promise<({
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
                stoneWeight: string | null;
                tokenNumber: string | null;
                makingCharges: string | null;
                otherCharges: string | null;
                description: string | null;
                modelNumber: string | null;
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
        panCard: string | null;
        aadharCard: string | null;
        totalAmount: number;
        gstAmount: number;
        itemsCount: number;
        status: import(".prisma/client").$Enums.OrderStatus;
        paymentStatus: import(".prisma/client").$Enums.PaymentStatus;
    })[]>;
    create(dto: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
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
    }>;
    updateStatus(id: string, status: OrderStatus): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
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
    }>;
    getMetrics(): Promise<{
        totalSales: number;
        totalOrdersCount: number;
        activeOrdersCount: number;
        deliveredOrdersCount: number;
    }>;
    getAdminDashboardMetrics(): Promise<{
        totalRevenue: number;
        salesCount: number;
        monthlyMetrics: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            month: string;
            sortOrder: number;
            changePct: string;
            isPositive: boolean;
            totalRevenue: number;
            goldRevenue: number;
            silverRevenue: number;
            diamondRevenue: number;
            goldPct: number;
            silverPct: number;
            diamondPct: number;
            barHeight: string;
        }[];
        recentOrders: ({
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
                    stoneWeight: string | null;
                    tokenNumber: string | null;
                    makingCharges: string | null;
                    otherCharges: string | null;
                    description: string | null;
                    modelNumber: string | null;
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
            panCard: string | null;
            aadharCard: string | null;
            totalAmount: number;
            gstAmount: number;
            itemsCount: number;
            status: import(".prisma/client").$Enums.OrderStatus;
            paymentStatus: import(".prisma/client").$Enums.PaymentStatus;
        })[];
    }>;
}
