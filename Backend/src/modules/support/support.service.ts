import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class SupportService {
  constructor(private prisma: PrismaService) {}

  async createSession(firebaseId: string) {
    const session = await this.prisma.supportSession.create({
      data: {
        firebaseId,
        status: "bot",
      },
    });

    // Create welcome bot message
    await this.prisma.supportMessage.create({
      data: {
        sessionId: session.id,
        sender: "bot",
        content: "Hello! I am Jewellery Garden's automated customer support assistant. How can I help you today?",
      },
    });

    return session;
  }

  async getSessions(firebaseId: string) {
    return this.prisma.supportSession.findMany({
      where: { firebaseId },
      orderBy: { createdAt: "desc" },
    });
  }

  async getMessages(sessionId: string) {
    return this.prisma.supportMessage.findMany({
      where: { sessionId },
      orderBy: { createdAt: "asc" },
    });
  }

  async addMessage(sessionId: string, sender: string, content: string) {
    const session = await this.prisma.supportSession.findUnique({
      where: { id: sessionId },
    });
    if (!session) {
      throw new NotFoundException(`Support session ${sessionId} not found`);
    }

    const userMsg = await this.prisma.supportMessage.create({
      data: {
        sessionId,
        sender,
        content,
      },
    });

    // Automated bot reply if session is still in 'bot' mode
    if (sender === "user" && session.status === "bot") {
      let botReply = "Thank you for reaching out! A member of our concierge team will review your query shortly.";
      const lower = content.toLowerCase();

      if (lower.includes("order") || lower.includes("track")) {
        botReply = "To track your order, please visit the 'Your Orders' section in your account dashboard or share your Order ID here.";
      } else if (lower.includes("return") || lower.includes("refund")) {
        botReply = "Jewellery Garden offers a hassle-free 15-day return policy on all unworn items with original certificate & tags.";
      } else if (lower.includes("store") || lower.includes("durgapur") || lower.includes("showroom")) {
        botReply = "Our flagship showrooms are located at Durgapur Benachity Bazar and City Centre. We are open daily from 10:30 AM to 8:30 PM.";
      } else if (lower.includes("scheme") || lower.includes("gold")) {
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

  async escalate(sessionId: string) {
    const session = await this.prisma.supportSession.findUnique({
      where: { id: sessionId },
    });
    if (!session) {
      throw new NotFoundException(`Support session ${sessionId} not found`);
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
}
