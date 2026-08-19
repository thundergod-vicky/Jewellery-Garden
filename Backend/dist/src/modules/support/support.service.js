"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupportService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let SupportService = class SupportService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createSession(firebaseId) {
        const session = await this.prisma.supportSession.create({
            data: {
                firebaseId,
                status: "bot",
            },
        });
        await this.prisma.supportMessage.create({
            data: {
                sessionId: session.id,
                sender: "bot",
                content: "Hello! I am Jewellery Garden's automated customer support assistant. How can I help you today?",
            },
        });
        return session;
    }
    async getSessions(firebaseId) {
        return this.prisma.supportSession.findMany({
            where: { firebaseId },
            orderBy: { createdAt: "desc" },
        });
    }
    async getMessages(sessionId) {
        return this.prisma.supportMessage.findMany({
            where: { sessionId },
            orderBy: { createdAt: "asc" },
        });
    }
    async addMessage(sessionId, sender, content) {
        const session = await this.prisma.supportSession.findUnique({
            where: { id: sessionId },
        });
        if (!session) {
            throw new common_1.NotFoundException(`Support session ${sessionId} not found`);
        }
        const userMsg = await this.prisma.supportMessage.create({
            data: {
                sessionId,
                sender,
                content,
            },
        });
        if (sender === "user" && session.status === "bot") {
            let botReply = "Thank you for reaching out! A member of our concierge team will review your query shortly.";
            const lower = content.toLowerCase();
            if (lower.includes("order") || lower.includes("track")) {
                botReply = "To track your order, please visit the 'Your Orders' section in your account dashboard or share your Order ID here.";
            }
            else if (lower.includes("return") || lower.includes("refund")) {
                botReply = "Jewellery Garden offers a hassle-free 15-day return policy on all unworn items with original certificate & tags.";
            }
            else if (lower.includes("store") || lower.includes("durgapur") || lower.includes("showroom")) {
                botReply = "Our flagship showrooms are located at Durgapur Benachity Bazar and City Centre. We are open daily from 10:30 AM to 8:30 PM.";
            }
            else if (lower.includes("scheme") || lower.includes("gold")) {
                botReply = "Jewellery Garden offers monthly gold deposit schemes with special bonus discounts. Visit our showrooms for terms & details.";
            }
            await this.prisma.supportMessage.create({
                data: {
                    sessionId,
                    sender: "bot",
                    content: botReply,
                },
            });
        }
        return this.getMessages(sessionId);
    }
    async escalate(sessionId) {
        const session = await this.prisma.supportSession.findUnique({
            where: { id: sessionId },
        });
        if (!session) {
            throw new common_1.NotFoundException(`Support session ${sessionId} not found`);
        }
        const updated = await this.prisma.supportSession.update({
            where: { id: sessionId },
            data: { status: "escalated" },
        });
        await this.prisma.supportMessage.create({
            data: {
                sessionId,
                sender: "bot",
                content: "Your chat has been escalated. A live Jewellery Garden specialist will join this conversation shortly.",
            },
        });
        return updated;
    }
};
exports.SupportService = SupportService;
exports.SupportService = SupportService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SupportService);
//# sourceMappingURL=support.service.js.map