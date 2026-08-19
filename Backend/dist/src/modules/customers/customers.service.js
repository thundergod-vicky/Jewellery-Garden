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
exports.CustomersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let CustomersService = class CustomersService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto) {
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
        }
        catch (err) {
            if (err.code === "P2002") {
                const found = await this.prisma.customer.findFirst({
                    where: {
                        OR: [
                            { firebaseId: dto.firebaseId },
                            ...(emailNormalized ? [{ email: emailNormalized }] : []),
                        ],
                    },
                });
                if (found)
                    return found;
            }
            throw err;
        }
    }
    async findAll() {
        return this.prisma.customer.findMany({
            orderBy: { createdAt: "desc" },
        });
    }
    async findByFirebaseId(firebaseId) {
        const customer = await this.prisma.customer.findUnique({
            where: { firebaseId },
        });
        if (!customer) {
            const byId = await this.prisma.customer.findUnique({
                where: { id: firebaseId },
            });
            if (!byId) {
                throw new common_1.NotFoundException(`Customer with ID ${firebaseId} not found`);
            }
            return byId;
        }
        return customer;
    }
    async update(firebaseId, dto) {
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
    async delete(id) {
        let customer = await this.prisma.customer.findUnique({ where: { id } });
        if (!customer) {
            customer = await this.prisma.customer.findUnique({ where: { firebaseId: id } });
        }
        if (!customer) {
            throw new common_1.NotFoundException(`Customer with ID ${id} not found`);
        }
        return this.prisma.customer.delete({
            where: { id: customer.id },
        });
    }
};
exports.CustomersService = CustomersService;
exports.CustomersService = CustomersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CustomersService);
//# sourceMappingURL=customers.service.js.map