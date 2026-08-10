import { ProductsService, ProductItem } from "./products.service";
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    getAll(): ProductItem[];
    getOne(id: string): ProductItem;
    create(dto: Partial<ProductItem>): ProductItem;
    update(id: string, dto: Partial<ProductItem>): ProductItem;
    delete(id: string): {
        success: boolean;
    };
}
