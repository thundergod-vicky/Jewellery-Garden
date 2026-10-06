import { PrismaService } from "../../prisma/prisma.service";
export interface CreateCustomerDto {
    firebaseId: string;
    email: string;
    username: string;
    phone?: string;
    panCard?: string;
    aadharCard?: string;
    addresses?: string[];
    savedCards?: string;
}
export interface UpdateCustomerDto {
    username?: string;
    phone?: string;
    panCard?: string;
    aadharCard?: string;
    addresses?: string[];
    savedCards?: string;
}
export declare class CustomersService {
    private prisma;
    constructor(prisma: PrismaService);
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
    findByFirebaseId(firebaseId: string): Promise<{
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
    delete(id: string): Promise<{
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
