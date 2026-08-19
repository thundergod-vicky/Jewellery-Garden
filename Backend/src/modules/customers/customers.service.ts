import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";

export interface CreateCustomerDto {
  firebaseId: string;
  email: string;
  username: string;
  phone?: string;
  addresses?: string[];
  savedCards?: string;
}

export interface UpdateCustomerDto {
  username?: string;
  phone?: string;
  addresses?: string[];
  savedCards?: string;
}

@Injectable()
export class CustomersService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateCustomerDto) {
    const emailNormalized = (dto.email || "").toLowerCase();
    const existing = await this.prisma.customer.findFirst({
      where: {
        OR: [
          { firebaseId: dto.firebaseId },
          ...(emailNormalized ? [{ email: emailNormalized }] : []),
        ],
      },
    });
    if (existing) {
      return existing;
    }

    try {
      return await this.prisma.customer.create({
        data: {
          firebaseId: dto.firebaseId,
          email: emailNormalized,
          username: dto.username,
          phone: dto.phone || "",
          addresses: dto.addresses || [],
          savedCards: dto.savedCards || null,
          superPearls: 50,
        },
      });
    } catch (err: any) {
      if (err.code === "P2002") {
        const found = await this.prisma.customer.findFirst({
          where: {
            OR: [
              { firebaseId: dto.firebaseId },
              ...(emailNormalized ? [{ email: emailNormalized }] : []),
            ],
          },
        });
        if (found) return found;
      }
      throw err;
    }
  }

  async findAll() {
    return this.prisma.customer.findMany({
      orderBy: { createdAt: "desc" },
    });
  }

  async findByFirebaseId(firebaseId: string) {
    const customer = await this.prisma.customer.findUnique({
      where: { firebaseId },
    });
    if (!customer) {
      const byId = await this.prisma.customer.findUnique({
        where: { id: firebaseId },
      });
      if (!byId) {
        throw new NotFoundException(`Customer with ID ${firebaseId} not found`);
      }
      return byId;
    }
    return customer;
  }

  async update(firebaseId: string, dto: UpdateCustomerDto) {
    const customer = await this.findByFirebaseId(firebaseId);
    return this.prisma.customer.update({
      where: { id: customer.id },
      data: {
        ...(dto.username !== undefined && { username: dto.username }),
        ...(dto.phone !== undefined && { phone: dto.phone }),
        ...(dto.addresses !== undefined && { addresses: dto.addresses }),
        ...(dto.savedCards !== undefined && { savedCards: dto.savedCards }),
      },
    });
  }

  async delete(id: string) {
    let customer = await this.prisma.customer.findUnique({ where: { id } });
    if (!customer) {
      customer = await this.prisma.customer.findUnique({ where: { firebaseId: id } });
    }
    if (!customer) {
      throw new NotFoundException(`Customer with ID ${id} not found`);
    }

    return this.prisma.customer.delete({
      where: { id: customer.id },
    });
  }
}
