"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let SearchService = class SearchService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async searchAll(query) {
        const q = (query || "").trim();
        if (!q) {
            return { products: [], orders: [], customers: [] };
        }
        const [products, orders, customers] = await Promise.all([
            this.prisma.product.findMany({
                where: {
                    active: true,
                    OR: [
                        { name: { contains: q, mode: "insensitive" } },
                        { sku: { contains: q, mode: "insensitive" } },
                        { category: { contains: q, mode: "insensitive" } },
                    ],
                },
                take: 10,
                orderBy: { updatedAt: "desc" },
            }),
            this.prisma.order.findMany({
                where: {
                    OR: [
                        { orderNumber: { contains: q, mode: "insensitive" } },
                        { customerEmail: { contains: q, mode: "insensitive" } },
                        { customerPhone: { contains: q, mode: "insensitive" } },
                    ],
                },
                take: 10,
                orderBy: { createdAt: "desc" },
                include: { items: { include: { product: true } } },
            }),
            this.prisma.customer.findMany({
                where: {
                    OR: [
                        { username: { contains: q, mode: "insensitive" } },
                        { email: { contains: q, mode: "insensitive" } },
                        { phone: { contains: q, mode: "insensitive" } },
                    ],
                },
                take: 10,
                orderBy: { createdAt: "desc" },
            }),
        ]);
        return { products, orders, customers };
    }
};
exports.SearchService = SearchService;
exports.SearchService = SearchService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SearchService);
//# sourceMappingURL=search.service.js.map