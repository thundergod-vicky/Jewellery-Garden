import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.product.findMany({
      where: { active: true },
      orderBy: { createdAt: "desc" },
    });
  }

  async findOne(id: string) {
    const item = await this.prisma.product.findFirst({
      where: { OR: [{ id }, { sku: id }] },
    });
    if (!item) {
      throw new NotFoundException(`Product with ID or SKU ${id} not found in database.`);
    }
    return item;
  }

  async create(dto: any) {
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

  async delete(id: string) {
    await this.prisma.product.delete({ where: { id } });
    return { success: true };
  }
}
