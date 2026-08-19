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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupportController = void 0;
const common_1 = require("@nestjs/common");
const support_service_1 = require("./support.service");
let SupportController = class SupportController {
    constructor(supportService) {
        this.supportService = supportService;
    }
    async createSession(firebaseId) {
        return this.supportService.createSession(firebaseId);
    }
    async getSessions(firebaseId) {
        return this.supportService.getSessions(firebaseId);
    }
    async getMessages(sessionId) {
        return this.supportService.getMessages(sessionId);
    }
    async addMessage(sessionId, querySender, bodySender, content) {
        const sender = querySender || bodySender || "user";
        return this.supportService.addMessage(sessionId, sender, content);
    }
    async escalate(sessionId) {
        return this.supportService.escalate(sessionId);
    }
};
exports.SupportController = SupportController;
__decorate([
    (0, common_1.Post)("sessions"),
    __param(0, (0, common_1.Body)("firebaseId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SupportController.prototype, "createSession", null);
__decorate([
    (0, common_1.Get)("sessions"),
    __param(0, (0, common_1.Query)("firebaseId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SupportController.prototype, "getSessions", null);
__decorate([
    (0, common_1.Get)("sessions/:id/messages"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SupportController.prototype, "getMessages", null);
__decorate([
    (0, common_1.Post)("sessions/:id/messages"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Query)("sender")),
    __param(2, (0, common_1.Body)("sender")),
    __param(3, (0, common_1.Body)("content")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String]),
    __metadata("design:returntype", Promise)
], SupportController.prototype, "addMessage", null);
__decorate([
    (0, common_1.Post)("sessions/:id/escalate"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SupportController.prototype, "escalate", null);
exports.SupportController = SupportController = __decorate([
    (0, common_1.Controller)("api/support"),
    __metadata("design:paramtypes", [support_service_1.SupportService])
], SupportController);
//# sourceMappingURL=support.controller.js.map