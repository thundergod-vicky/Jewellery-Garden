export interface ProductItem {
    id: string;
    slug: string;
    name: string;
    category: string;
    categorySlug: string;
    metal: "Gold" | "Silver";
    purity: string;
    grossWeight: string;
    netWeight: string;
    price: number;
    stock: number;
    sku: string;
    image: string;
    active: boolean;
}
export declare class ProductsService {
    private products;
    findAll(): ProductItem[];
    findOne(id: string): ProductItem;
    create(dto: Partial<ProductItem>): ProductItem;
    update(id: string, dto: Partial<ProductItem>): ProductItem;
    delete(id: string): {
        success: boolean;
    };
}
