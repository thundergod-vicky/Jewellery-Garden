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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const nodemailer = require("nodemailer");
let AuthService = class AuthService {
    constructor(jwtService) {
        this.jwtService = jwtService;
        this.otpStore = new Map();
    }
    async sendOtp(email) {
        if (!email || !email.includes("@")) {
            throw new common_1.BadRequestException("Please provide a valid email address.");
        }
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const expiresAt = Date.now() + 5 * 60 * 1000;
        this.otpStore.set(email.toLowerCase(), { otp, expiresAt });
        if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
            try {
                const transporter = nodemailer.createTransport({
                    host: process.env.SMTP_HOST,
                    port: Number(process.env.SMTP_PORT) || 587,
                    secure: false,
                    auth: {
                        user: process.env.SMTP_USER,
                        pass: process.env.SMTP_PASS,
                    },
                });
                await transporter.sendMail({
                    from: `"Jewellery Garden Security" <${process.env.SMTP_USER}>`,
                    to: email,
                    subject: "Your Login Verification Code - Jewellery Garden",
                    html: `
            <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #FAF8F5;">
              <h2 style="color: #CC2529;">Jewellery Garden Login Verification</h2>
              <p>Your 6-digit Email OTP for logging into Jewellery Garden is:</p>
              <h1 style="color: #1A1A1A; letter-spacing: 5px; background: #ffffff; padding: 10px; border-radius: 8px; text-align: center; border: 1px solid #E8E3DA;">${otp}</h1>
              <p>This OTP is valid for 5 minutes. Please do not share it with anyone.</p>
            </div>
          `,
                });
            }
            catch (err) {
                console.warn("SMTP Transporter warn:", err.message);
            }
        }
        return {
            success: true,
            message: `Verification code sent to ${email}`,
            debugOtp: otp,
        };
    }
    async verifyOtp(email, otp) {
        const record = this.otpStore.get(email.toLowerCase());
        if (!record) {
            throw new common_1.UnauthorizedException("No OTP requested for this email address.");
        }
        if (Date.now() > record.expiresAt) {
            this.otpStore.delete(email.toLowerCase());
            throw new common_1.UnauthorizedException("OTP has expired. Please request a new code.");
        }
        if (record.otp !== otp) {
            throw new common_1.UnauthorizedException("Invalid OTP code entered.");
        }
        this.otpStore.delete(email.toLowerCase());
        const payload = { email: email.toLowerCase(), role: "USER", sub: email.toLowerCase() };
        const accessToken = this.jwtService.sign(payload);
        return {
            accessToken,
            user: {
                email: email.toLowerCase(),
                role: "USER",
            },
        };
    }
    async adminLogin(email, password) {
        const adminEmail = process.env.ADMIN_EMAIL || "admin@jewellerygardenpvtltd.com";
        const adminPassword = process.env.ADMIN_PASSWORD || "Admin@Garden2026!";
        if (email.toLowerCase() !== adminEmail.toLowerCase() || password !== adminPassword) {
            throw new common_1.UnauthorizedException("Invalid Admin Credentials.");
        }
        const payload = { email: adminEmail, role: "ADMIN", sub: adminEmail };
        const accessToken = this.jwtService.sign(payload);
        return {
            accessToken,
            admin: {
                email: adminEmail,
                role: "ADMIN",
            },
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map