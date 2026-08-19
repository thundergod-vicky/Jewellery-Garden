import { Controller, Get, Param } from "@nestjs/common";
import { LoyaltyService } from "./loyalty.service";

@Controller("api/loyalty")
export class LoyaltyController {
  constructor(private readonly loyaltyService: LoyaltyService) {}

  @Get("profile/:customerId")
  async getProfile(@Param("customerId") customerId: string) {
    return this.loyaltyService.getLoyaltyProfile(customerId);
  }
}
