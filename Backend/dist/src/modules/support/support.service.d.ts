import { PrismaService } from "../../prisma/prisma.service";
export declare class SupportService {
    private prisma;
    constructor(prisma: PrismaService);
    createSession(firebaseId: string): Promise<{
        id: string;
        firebaseId: string;
        status: string;
        createdAt: Date;
    }>;
    getSessions(firebaseId: string): Promise<{
        id: string;
        firebaseId: string;
        status: string;
        createdAt: Date;
    }[]>;
    getMessages(sessionId: string): Promise<{
        id: string;
        createdAt: Date;
        sessionId: string;
        sender: string;
        content: string;
    }[]>;
    addMessage(sessionId: string, sender: string, content: string): Promise<{
        id: string;
        createdAt: Date;
        sessionId: string;
        sender: string;
        content: string;
    }[]>;
    escalate(sessionId: string): Promise<{
        id: string;
        firebaseId: string;
        status: string;
        createdAt: Date;
    }>;
}
