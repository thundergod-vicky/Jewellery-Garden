import { PrismaService } from "../../prisma/prisma.service";
export declare class ProductsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        sku: string;
        category: string;
        metal: import(".prisma/client").$Enums.MetalType;
        purity: string;
        grossWeight: string;
        netWeight: string;
        price: number;
        stock: number;
        image: string;
        active: boolean;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        sku: string;
        category: string;
        metal: import(".prisma/client").$Enums.MetalType;
        purity: string;
        grossWeight: string;
        netWeight: string;
        price: number;
        stock: number;
        image: string;
        active: boolean;
    }>;
    create(dto: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        sku: string;
        category: string;
        metal: import(".prisma/client").$Enums.MetalType;
        purity: string;
        grossWeight: string;
        netWeight: string;
        price: number;
        stock: number;
        image: string;
        active: boolean;
    }>;
    delete(id: string): Promise<{
        success: boolean;
    }>;
}
