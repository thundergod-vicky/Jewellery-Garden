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
export declare class CustomersService {
    private prisma;
    constructor(prisma: PrismaService);
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
    findByFirebaseId(firebaseId: string): Promise<{
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
    delete(id: string): Promise<{
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
