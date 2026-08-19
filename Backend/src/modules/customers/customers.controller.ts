import { Controller, Get, Post, Put, Delete, Body, Param } from "@nestjs/common";
import { CustomersService, CreateCustomerDto, UpdateCustomerDto } from "./customers.service";

@Controller("api/customers")
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Get()
  async findAll() {
    return this.customersService.findAll();
  }

  @Post()
  async create(@Body() dto: CreateCustomerDto) {
    return this.customersService.create(dto);
  }

  @Get(":firebaseId")
  async findOne(@Param("firebaseId") firebaseId: string) {
    try {
      const customer = await this.customersService.findByFirebaseId(firebaseId);
      return { found: true, customer };
    } catch (err) {
      return { found: false, customer: null };
    }
  }

  @Put(":firebaseId")
  async update(
    @Param("firebaseId") firebaseId: string,
    @Body() dto: UpdateCustomerDto,
  ) {
    return this.customersService.update(firebaseId, dto);
  }

  @Delete(":id")
  async remove(@Param("id") id: string) {
    return this.customersService.delete(id);
  }
}
