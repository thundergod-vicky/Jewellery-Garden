export interface OrderItem {
    id: string;
    orderNumber: string;
    customerEmail: string;
    customerPhone: string;
    totalAmount: number;
    gstAmount: number;
    itemsCount: number;
    status: "PENDING" | "PROCESSING" | "SHIPPED" | "DELIVERED";
    paymentStatus: "PAID" | "PENDING";
    createdAt: string;
}
export declare class OrdersService {
    private orders;
    findAll(): OrderItem[];
    updateStatus(id: string, status: "PENDING" | "PROCESSING" | "SHIPPED" | "DELIVERED"): OrderItem;
    getMetrics(): {
        totalSales: number;
        totalOrdersCount: number;
        activeOrdersCount: number;
        deliveredOrdersCount: number;
    };
}
