import { Injectable, NotFoundException } from "@nestjs/common";

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

@Injectable()
export class OrdersService {
  private orders: OrderItem[] = [
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

  findAll(): OrderItem[] {
    return this.orders;
  }

  updateStatus(id: string, status: "PENDING" | "PROCESSING" | "SHIPPED" | "DELIVERED"): OrderItem {
    const order = this.orders.find((o) => o.id === id || o.orderNumber === id);
    if (!order) {
      throw new NotFoundException(`Order ${id} not found.`);
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
}
