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
                stoneWeight: dto.stoneWeight || null,
                tokenNumber: dto.tokenNumber || null,
                makingCharges: dto.makingCharges || null,
                otherCharges: dto.otherCharges || null,
                description: dto.description || null,
                modelNumber: dto.modelNumber || null,
                price: Number(dto.price) || 0,
                stock: Number(dto.stock) || 0,
                image: dto.image || "/images/gifts/engagement.png",
                active: dto.active !== undefined ? Boolean(dto.active) : true,
            },
        });
    }
    async update(id, dto) {
        let existing = await this.prisma.product.findFirst({
            where: { OR: [{ id }, { sku: id }] },
        });
        if (!existing) {
            const sku = dto.sku || id || `JG-${Math.floor(100000 + Math.random() * 900000)}`;
            return this.prisma.product.create({
                data: {
                    sku,
                    name: dto.name || "Jewellery Product",
                    category: dto.category || "Jewellery",
                    metal: dto.metal === "Silver" ? "Silver" : "Gold",
                    purity: dto.purity || "22KT 916 BIS Hallmarked",
                    grossWeight: dto.grossWeight || "0.00g",
                    netWeight: dto.netWeight || "0.00g",
                    stoneWeight: dto.stoneWeight || null,
                    tokenNumber: dto.tokenNumber || null,
                    makingCharges: dto.makingCharges || null,
                    otherCharges: dto.otherCharges || null,
                    description: dto.description || null,
                    modelNumber: dto.modelNumber || null,
                    price: Number(dto.price) || 0,
                    stock: Number(dto.stock) || 0,
                    image: dto.image || "/images/gifts/engagement.png",
                    active: dto.active !== undefined ? Boolean(dto.active) : true,
                },
            });
        }
        return this.prisma.product.update({
            where: { id: existing.id },
            data: {
                name: dto.name !== undefined ? dto.name : existing.name,
                category: dto.category !== undefined ? dto.category : existing.category,
                metal: dto.metal === "Silver" ? "Silver" : dto.metal === "Gold" ? "Gold" : existing.metal,
                purity: dto.purity !== undefined ? dto.purity : existing.purity,
                grossWeight: dto.grossWeight !== undefined ? dto.grossWeight : existing.grossWeight,
                netWeight: dto.netWeight !== undefined ? dto.netWeight : existing.netWeight,
                stoneWeight: dto.stoneWeight !== undefined ? dto.stoneWeight : existing.stoneWeight,
                tokenNumber: dto.tokenNumber !== undefined ? dto.tokenNumber : existing.tokenNumber,
                makingCharges: dto.makingCharges !== undefined ? dto.makingCharges : existing.makingCharges,
                otherCharges: dto.otherCharges !== undefined ? dto.otherCharges : existing.otherCharges,
                description: dto.description !== undefined ? dto.description : existing.description,
                modelNumber: dto.modelNumber !== undefined ? dto.modelNumber : existing.modelNumber,
                price: dto.price !== undefined ? Number(dto.price) : existing.price,
                stock: dto.stock !== undefined ? Number(dto.stock) : existing.stock,
                image: dto.image !== undefined ? dto.image : existing.image,
                active: dto.active !== undefined ? Boolean(dto.active) : existing.active,
            },
        });
    }
    async delete(id) {
        await this.prisma.product.deleteMany({
            where: { OR: [{ id }, { sku: id }] },
        });
        return { success: true };
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProductsService);
//# sourceMappingURL=products.service.js.map