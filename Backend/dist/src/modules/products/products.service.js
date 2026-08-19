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
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let ProductsService = class ProductsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll() {
        return this.prisma.product.findMany({
            where: { active: true },
            orderBy: { createdAt: "desc" },
        });
    }
    async findOne(id) {
        const item = await this.prisma.product.findFirst({
            where: { OR: [{ id }, { sku: id }] },
        });
        if (!item) {
            throw new common_1.NotFoundException(`Product with ID or SKU ${id} not found in database.`);
        }
        return item;
    }
    async create(dto) {
        const sku = dto.sku || `JG-${Math.floor(100000 + Math.random() * 900000)}`;
        return this.prisma.product.create({
            data: {
                sku,
                name: dto.name,
                category: dto.category || "Gold Rings",
                metal: dto.metal === "Silver" ? "Silver" : "Gold",
                purity: dto.purity || "22KT 916 BIS Hallmarked",
                grossWeight: dto.grossWeight || "0.00g",
                netWeight: dto.netWeight || "0.00g",
                price: Number(dto.price) || 0,
                stock: Number(dto.stock) || 0,
                image: dto.image || "/images/gifts/engagement.png",
                active: dto.active !== undefined ? Boolean(dto.active) : true,
            },
        });
    }
    async delete(id) {
        await this.prisma.product.delete({ where: { id } });
        return { success: true };
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProductsService);
//# sourceMappingURL=products.service.js.map