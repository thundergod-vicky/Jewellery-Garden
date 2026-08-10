import { Controller, Get, Post, Put, Delete, Param, Body } from "@nestjs/common";
import { ProductsService, ProductItem } from "./products.service";

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
  create(@Body() dto: Partial<ProductItem>) {
    return this.productsService.create(dto);
  }

  @Put(":id")
  update(@Param("id") id: string, @Body() dto: Partial<ProductItem>) {
    return this.productsService.update(id, dto);
  }

  @Delete(":id")
  delete(@Param("id") id: string) {
    return this.productsService.delete(id);
  }
}
