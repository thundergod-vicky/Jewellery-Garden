"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
let OrdersService = class OrdersService {
    constructor() {
        this.orders = [
            {
                id: "ord-1",
                orderNumber: "JG-2026-8812",
                customerEmail: "customer@gmail.com",
                customerPhone: "+91 98321 44556",
                totalAmount: 34800,
                gstAmount: 1013,
                itemsCount: 1,
                status: "PROCESSING",
                paymentStatus: "PAID",
                createdAt: "2026-08-10 14:30",
            },
            {
                id: "ord-2",
                orderNumber: "JG-2026-8813",
                customerEmail: "bengali.bride@gmail.com",
                customerPhone: "+91 97330 99887",
                totalAmount: 89500,
                gstAmount: 2606,
                itemsCount: 1,
                status: "SHIPPED",
                paymentStatus: "PAID",
                createdAt: "2026-08-09 11:15",
            },
            {
                id: "ord-3",
                orderNumber: "JG-2026-8814",
                customerEmail: "durgapur.buyer@yahoo.com",
                customerPhone: "+91 76050 11223",
                totalAmount: 12521,
                gstAmount: 365,
                itemsCount: 1,
                status: "DELIVERED",
                paymentStatus: "PAID",
                createdAt: "2026-08-08 16:45",
            },
        ];
    }
    findAll() {
        return this.orders;
    }
    updateStatus(id, status) {
        const order = this.orders.find((o) => o.id === id || o.orderNumber === id);
        if (!order) {
            throw new common_1.NotFoundException(`Order ${id} not found.`);
        }
        order.status = status;
        return order;
    }
    getMetrics() {
        const totalSales = this.orders.reduce((sum, o) => sum + o.totalAmount, 0);
        const activeOrders = this.orders.filter((o) => o.status !== "DELIVERED").length;
        return {
            totalSales,
            totalOrdersCount: this.orders.length,
            activeOrdersCount: activeOrders,
            deliveredOrdersCount: this.orders.length - activeOrders,
        };
    }
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)()
], OrdersService);
//# sourceMappingURL=orders.service.js.map