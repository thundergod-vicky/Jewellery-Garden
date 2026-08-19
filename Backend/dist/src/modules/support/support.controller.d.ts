import { SupportService } from "./support.service";
export declare class SupportController {
    private readonly supportService;
    constructor(supportService: SupportService);
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
    addMessage(sessionId: string, querySender: string, bodySender: string, content: string): Promise<{
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
