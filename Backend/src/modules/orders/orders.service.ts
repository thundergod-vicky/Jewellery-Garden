import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { OrderStatus } from "@prisma/client";

@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.order.findMany({
      orderBy: { createdAt: "desc" },
      include: { items: { include: { product: true } } },
    });
  }

  async findByCustomer(firebaseId: string) {
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


  async updateStatus(id: string, status: OrderStatus) {
    const existing = await this.prisma.order.findUnique({ where: { id } });
    if (!existing) {
      throw new NotFoundException(`Order ${id} not found in database.`);
    }
    return this.prisma.order.update({
      where: { id },
      data: { status },
    });
  }

  async getMetrics() {
    const orders = await this.prisma.order.findMany();
    const totalSales = orders.reduce((sum, o) => sum + o.totalAmount, 0);
    const activeOrders = orders.filter((o) => o.status !== OrderStatus.COMPLETED).length;

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
    const completedCount = allOrders.filter(o => o.status === OrderStatus.COMPLETED).length;

    return {
      totalRevenue,
      salesCount: completedCount,
      monthlyMetrics,
      recentOrders,
    };
  }
}
