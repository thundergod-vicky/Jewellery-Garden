import { ProductsService } from "./products.service";
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    getAll(): Promise<{
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
    getOne(id: string): Promise<{
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
