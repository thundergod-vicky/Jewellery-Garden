import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "./modules/auth/auth.controller";
import { AuthService } from "./modules/auth/auth.service";
import { ProductsController } from "./modules/products/products.controller";
import { ProductsService } from "./modules/products/products.service";
import { OrdersController } from "./modules/orders/orders.controller";
import { OrdersService } from "./modules/orders/orders.service";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    JwtModule.register({
      secret: process.env.JWT_SECRET || "jewellery_garden_jwt_secret_key_2026_xyz_789",
      signOptions: { expiresIn: "7d" },
    }),
  ],
  controllers: [AuthController, ProductsController, OrdersController],
  providers: [AuthService, ProductsService, OrdersService],
})
export class AppModule {}
