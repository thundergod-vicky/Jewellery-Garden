import { Injectable, UnauthorizedException, BadRequestException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as nodemailer from "nodemailer";

interface OtpEntry {
  otp: string;
  expiresAt: number;
}

@Injectable()
export class AuthService {
  private otpStore = new Map<string, OtpEntry>();

  constructor(private jwtService: JwtService) {}

  // 1. Generate & Send 6-Digit Email OTP
  async sendOtp(email: string): Promise<{ success: boolean; message: string; debugOtp?: string }> {
    if (!email || !email.includes("@")) {
      throw new BadRequestException("Please provide a valid email address.");
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes validity

    this.otpStore.set(email.toLowerCase(), { otp, expiresAt });

    // Optional Nodemailer Transport
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
      } catch (err) {
        console.warn("SMTP Transporter warn:", err.message);
      }
    }

    return {
      success: true,
      message: `Verification code sent to ${email}`,
      debugOtp: otp, // Returned for dev testing convenience
    };
  }

  // 2. Verify Email OTP & Issue JWT Token
  async verifyOtp(email: string, otp: string): Promise<{ accessToken: string; user: { email: string; role: string } }> {
    const record = this.otpStore.get(email.toLowerCase());

    if (!record) {
      throw new UnauthorizedException("No OTP requested for this email address.");
    }

    if (Date.now() > record.expiresAt) {
      this.otpStore.delete(email.toLowerCase());
      throw new UnauthorizedException("OTP has expired. Please request a new code.");
    }

    if (record.otp !== otp) {
      throw new UnauthorizedException("Invalid OTP code entered.");
    }

    // OTP validated successfully
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

  // 3. Admin Login via Environment Variables
  async adminLogin(email: string, password: string): Promise<{ accessToken: string; admin: { email: string; role: string } }> {
    const adminEmail = process.env.ADMIN_EMAIL || "admin@jewellerygardenpvtltd.com";
    const adminPassword = process.env.ADMIN_PASSWORD || "Admin@Garden2026!";

    if (email.toLowerCase() !== adminEmail.toLowerCase() || password !== adminPassword) {
      throw new UnauthorizedException("Invalid Admin Credentials.");
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
}
