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

  async update(id: string, dto: any) {
    let existing = await this.prisma.product.findFirst({
      where: { OR: [{ id }, { sku: id }] },
    });

    if (!existing) {
      // If updating a catalog product that hasn't been written to DB yet, create it with updated fields
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

  async delete(id: string) {
    await this.prisma.product.deleteMany({
      where: { OR: [{ id }, { sku: id }] },
    });
    return { success: true };
  }
}
