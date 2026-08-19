import { Controller, Get, Post, Body, Param, Query } from "@nestjs/common";
import { SupportService } from "./support.service";

@Controller("api/support")
export class SupportController {
  constructor(private readonly supportService: SupportService) {}

  @Post("sessions")
  async createSession(@Body("firebaseId") firebaseId: string) {
    return this.supportService.createSession(firebaseId);
  }

  @Get("sessions")
  async getSessions(@Query("firebaseId") firebaseId: string) {
    return this.supportService.getSessions(firebaseId);
  }

  @Get("sessions/:id/messages")
  async getMessages(@Param("id") sessionId: string) {
    return this.supportService.getMessages(sessionId);
  }

  @Post("sessions/:id/messages")
  async addMessage(
    @Param("id") sessionId: string,
    @Query("sender") querySender: string,
    @Body("sender") bodySender: string,
    @Body("content") content: string,
  ) {
    const sender = querySender || bodySender || "user";
    return this.supportService.addMessage(sessionId, sender, content);
  }

  @Post("sessions/:id/escalate")
  async escalate(@Param("id") sessionId: string) {
    return this.supportService.escalate(sessionId);
  }
}
