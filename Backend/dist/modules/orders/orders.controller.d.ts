import { OrdersService } from "./orders.service";
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    getAll(): import("./orders.service").OrderItem[];
    getMetrics(): {
        totalSales: number;
        totalOrdersCount: number;
        activeOrdersCount: number;
        deliveredOrdersCount: number;
    };
    updateStatus(id: string, status: "PENDING" | "PROCESSING" | "SHIPPED" | "DELIVERED"): import("./orders.service").OrderItem;
}
