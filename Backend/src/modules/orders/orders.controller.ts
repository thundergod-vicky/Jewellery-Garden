import { Controller, Get, Post, Patch, Param, Body } from "@nestjs/common";
import { OrdersService } from "./orders.service";
import { OrderStatus } from "@prisma/client";

@Controller("api/orders")
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get("admin-dashboard")
  getAdminDashboard() {
    return this.ordersService.getAdminDashboardMetrics();
  }

  @Get("metrics")
  getMetrics() {
    return this.ordersService.getMetrics();
  }

  @Get("customer/:firebaseId")
  getByCustomer(@Param("firebaseId") firebaseId: string) {
    return this.ordersService.findByCustomer(firebaseId);
  }

  @Get()
  getAll() {
    return this.ordersService.findAll();
  }

  @Post()
  create(@Body() dto: any) {
    return this.ordersService.create(dto);
  }

  @Patch(":id/status")
  updateStatus(
    @Param("id") id: string,
    @Body("status") status: OrderStatus
  ) {
    return this.ordersService.updateStatus(id, status);
  }
}
