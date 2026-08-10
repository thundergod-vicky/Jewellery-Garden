import { Controller, Get, Patch, Param, Body } from "@nestjs/common";
import { OrdersService } from "./orders.service";

@Controller("api/orders")
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  getAll() {
    return this.ordersService.findAll();
  }

  @Get("metrics")
  getMetrics() {
    return this.ordersService.getMetrics();
  }

  @Patch(":id/status")
  updateStatus(
    @Param("id") id: string,
    @Body("status") status: "PENDING" | "PROCESSING" | "SHIPPED" | "DELIVERED"
  ) {
    return this.ordersService.updateStatus(id, status);
  }
}
