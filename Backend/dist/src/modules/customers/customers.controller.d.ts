import { CustomersService, CreateCustomerDto, UpdateCustomerDto } from "./customers.service";
export declare class CustomersController {
    private readonly customersService;
    constructor(customersService: CustomersService);
    findAll(): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        panCard: string | null;
        aadharCard: string | null;
        firebaseId: string;
        email: string;
        username: string;
        phone: string | null;
        addresses: string[];
        savedCards: string | null;
        superPearls: number;
    }[]>;
    create(dto: CreateCustomerDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        panCard: string | null;
        aadharCard: string | null;
        firebaseId: string;
        email: string;
        username: string;
        phone: string | null;
        addresses: string[];
        savedCards: string | null;
        superPearls: number;
    }>;
    findOne(firebaseId: string): Promise<{
        found: boolean;
        customer: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            panCard: string | null;
            aadharCard: string | null;
            firebaseId: string;
            email: string;
            username: string;
            phone: string | null;
            addresses: string[];
            savedCards: string | null;
            superPearls: number;
        };
    }>;
    update(firebaseId: string, dto: UpdateCustomerDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        panCard: string | null;
        aadharCard: string | null;
        firebaseId: string;
        email: string;
        username: string;
        phone: string | null;
        addresses: string[];
        savedCards: string | null;
        superPearls: number;
    }>;
    remove(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        panCard: string | null;
        aadharCard: string | null;
        firebaseId: string;
        email: string;
        username: string;
        phone: string | null;
        addresses: string[];
        savedCards: string | null;
        superPearls: number;
    }>;
}
