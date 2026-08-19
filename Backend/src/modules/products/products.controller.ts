import { Controller, Get, Post, Put, Delete, Param, Body } from "@nestjs/common";
import { ProductsService } from "./products.service";

@Controller("api/products")
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  getAll() {
    return this.productsService.findAll();
  }

  @Get(":id")
  getOne(@Param("id") id: string) {
    return this.productsService.findOne(id);
  }

  @Post()
  create(@Body() dto: any) {
    return this.productsService.create(dto);
  }

  @Delete(":id")
  delete(@Param("id") id: string) {
    return this.productsService.delete(id);
  }
}
