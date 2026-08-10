"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
let ProductsService = class ProductsService {
    constructor() {
        this.products = [
            {
                id: "p0",
                slug: "splendid-flower-diamond-nose-pin",
                name: "Splendid Flower Diamond Nose Pin",
                category: "Gold Nosepin",
                categorySlug: "gold-nosepin",
                metal: "Gold",
                purity: "18KT Gold with Certified Diamond",
                grossWeight: "0.85 grams",
                netWeight: "0.80 grams",
                price: 12796,
                stock: 14,
                sku: "DN-D000123787",
                image: "/images/gifts/birthday.png",
                active: true,
            },
            {
                id: "p1",
                slug: "crescent-wave-gold-ring",
                name: "Crescent Wave 22KT Gold Ring",
                category: "Gold Rings",
                categorySlug: "gold-rings",
                metal: "Gold",
                purity: "22KT 916 BIS Hallmarked",
                grossWeight: "3.40 grams",
                netWeight: "3.40 grams",
                price: 12521,
                stock: 22,
                sku: "GR-G00098231",
                image: "/images/gifts/engagement.png",
                active: true,
            },
            {
                id: "p2",
                slug: "royal-peacock-gold-jhumka",
                name: "Royal Peacock 22KT Gold Jhumka Earrings",
                category: "Gold Earrings",
                categorySlug: "gold-earrings",
                metal: "Gold",
                purity: "22KT 916 BIS Hallmarked",
                grossWeight: "8.65 grams",
                netWeight: "8.65 grams",
                price: 34800,
                stock: 8,
                sku: "ER-J00088192",
                image: "https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=800&q=80",
                active: true,
            },
            {
                id: "p3",
                slug: "bengali-traditional-sitahar-gold-necklace",
                name: "Bengali Traditional Sitahar Gold Bridal Necklace",
                category: "Gold Necklaces",
                categorySlug: "gold-necklaces",
                metal: "Gold",
                purity: "22KT 916 BIS Hallmarked",
                grossWeight: "24.15 grams",
                netWeight: "24.15 grams",
                price: 89500,
                stock: 5,
                sku: "NC-S00077281",
                image: "/images/gifts/wedding.png",
                active: true,
            },
            {
                id: "p5",
                slug: "handcrafted-925-sterling-silver-bangle",
                name: "Handcrafted 925 Sterling Silver Bangle Pair",
                category: "Silver Bangles",
                categorySlug: "silver-bangles",
                metal: "Silver",
                purity: "925 Sterling Silver",
                grossWeight: "28.50 grams",
                netWeight: "28.50 grams",
                price: 4850,
                stock: 35,
                sku: "SB-B00066123",
                image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80",
                active: true,
            },
        ];
    }
    findAll() {
        return this.products;
    }
    findOne(id) {
        const item = this.products.find((p) => p.id === id || p.slug === id);
        if (!item) {
            throw new common_1.NotFoundException(`Product with ID ${id} not found.`);
        }
        return item;
    }
    create(dto) {
        const id = `p-${Date.now()}`;
        const slug = (dto.name || "new-product")
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "");
        const newProduct = {
            id,
            slug,
            name: dto.name || "New Jewellery Item",
            category: dto.category || "Gold Rings",
            categorySlug: (dto.category || "gold-rings").toLowerCase().replace(/ /g, "-"),
            metal: dto.metal || "Gold",
            purity: dto.purity || "22KT 916 BIS Hallmarked",
            grossWeight: dto.grossWeight || "5.00 grams",
            netWeight: dto.netWeight || "5.00 grams",
            price: dto.price || 15000,
            stock: dto.stock || 10,
            sku: dto.sku || `JG-${Math.floor(100000 + Math.random() * 900000)}`,
            image: dto.image || "/images/gifts/engagement.png",
            active: dto.active !== undefined ? dto.active : true,
        };
        this.products.unshift(newProduct);
        return newProduct;
    }
    update(id, dto) {
        const index = this.products.findIndex((p) => p.id === id);
        if (index === -1) {
            throw new common_1.NotFoundException(`Product with ID ${id} not found.`);
        }
        this.products[index] = { ...this.products[index], ...dto };
        return this.products[index];
    }
    delete(id) {
        const index = this.products.findIndex((p) => p.id === id);
        if (index === -1) {
            throw new common_1.NotFoundException(`Product with ID ${id} not found.`);
        }
        this.products.splice(index, 1);
        return { success: true };
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)()
], ProductsService);
//# sourceMappingURL=products.service.js.map