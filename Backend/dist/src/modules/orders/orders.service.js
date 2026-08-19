"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const client_1 = require("@prisma/client");
let OrdersService = class OrdersService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll() {
        return this.prisma.order.findMany({
            orderBy: { createdAt: "desc" },
            include: { items: { include: { product: true } } },
        });
    }
    async findByCustomer(firebaseId) {
        const customer = await this.prisma.customer.findUnique({
            where: { firebaseId },
        });
        if (!customer) {
            return [];
        }
        return this.prisma.order.findMany({
            where: {
                OR: [
                    { userId: customer.id },
                    { customerEmail: customer.email },
                ],
            },
            orderBy: { createdAt: "desc" },
            include: { items: { include: { product: true } } },
        });
    }
    async updateStatus(id, status) {
        const existing = await this.prisma.order.findUnique({ where: { id } });
        if (!existing) {
            throw new common_1.NotFoundException(`Order ${id} not found in database.`);
        }
        return this.prisma.order.update({
            where: { id },
            data: { status },
        });
    }
    async getMetrics() {
        const orders = await this.prisma.order.findMany();
        const totalSales = orders.reduce((sum, o) => sum + o.totalAmount, 0);
        const activeOrders = orders.filter((o) => o.status !== client_1.OrderStatus.COMPLETED).length;
        return {
            totalSales,
            totalOrdersCount: orders.length,
            activeOrdersCount: activeOrders,
            deliveredOrdersCount: orders.length - activeOrders,
        };
    }
    async getAdminDashboardMetrics() {
        const monthlyMetrics = await this.prisma.monthlySalesMetric.findMany({
            orderBy: { sortOrder: "asc" },
        });
        const recentOrders = await this.prisma.order.findMany({
            take: 10,
            orderBy: { createdAt: "desc" },
            include: { items: { include: { product: true } } },
        });
        const allOrders = await this.prisma.order.findMany();
        const totalRevenue = allOrders.reduce((acc, curr) => acc + curr.totalAmount, 0);
        const completedCount = allOrders.filter(o => o.status === client_1.OrderStatus.COMPLETED).length;
        return {
            totalRevenue,
            salesCount: completedCount,
            monthlyMetrics,
            recentOrders,
        };
    }
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], OrdersService);
//# sourceMappingURL=orders.service.js.map