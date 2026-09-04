"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const prisma_module_1 = require("./prisma/prisma.module");
const auth_controller_1 = require("./modules/auth/auth.controller");
const auth_service_1 = require("./modules/auth/auth.service");
const products_controller_1 = require("./modules/products/products.controller");
const products_service_1 = require("./modules/products/products.service");
const orders_controller_1 = require("./modules/orders/orders.controller");
const orders_service_1 = require("./modules/orders/orders.service");
const customers_module_1 = require("./modules/customers/customers.module");
const loyalty_module_1 = require("./modules/loyalty/loyalty.module");
const support_module_1 = require("./modules/support/support.module");
const search_module_1 = require("./modules/search/search.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            jwt_1.JwtModule.register({
                secret: process.env.JWT_SECRET || "jewellery_garden_jwt_secret_key_2026_xyz_789",
                signOptions: { expiresIn: "7d" },
            }),
            prisma_module_1.PrismaModule,
            customers_module_1.CustomersModule,
            loyalty_module_1.LoyaltyModule,
            support_module_1.SupportModule,
            search_module_1.SearchModule,
        ],
        controllers: [auth_controller_1.AuthController, products_controller_1.ProductsController, orders_controller_1.OrdersController],
        providers: [auth_service_1.AuthService, products_service_1.ProductsService, orders_service_1.OrdersService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map