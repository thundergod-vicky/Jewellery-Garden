import { CustomersService, CreateCustomerDto, UpdateCustomerDto } from "./customers.service";
export declare class CustomersController {
    private readonly customersService;
    constructor(customersService: CustomersService);
    findAll(): Promise<{
        id: string;
        firebaseId: string;
        email: string;
        username: string;
        phone: string | null;
        addresses: string[];
        savedCards: string | null;
        superPearls: number;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    create(dto: CreateCustomerDto): Promise<{
        id: string;
        firebaseId: string;
        email: string;
        username: string;
        phone: string | null;
        addresses: string[];
        savedCards: string | null;
        superPearls: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findOne(firebaseId: string): Promise<{
        found: boolean;
        customer: {
            id: string;
            firebaseId: string;
            email: string;
            username: string;
            phone: string | null;
            addresses: string[];
            savedCards: string | null;
            superPearls: number;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
    update(firebaseId: string, dto: UpdateCustomerDto): Promise<{
        id: string;
        firebaseId: string;
        email: string;
        username: string;
        phone: string | null;
        addresses: string[];
        savedCards: string | null;
        superPearls: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: string): Promise<{
        id: string;
        firebaseId: string;
        email: string;
        username: string;
        phone: string | null;
        addresses: string[];
        savedCards: string | null;
        superPearls: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
