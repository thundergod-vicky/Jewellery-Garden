import { JwtService } from "@nestjs/jwt";
export declare class AuthService {
    private jwtService;
    private otpStore;
    constructor(jwtService: JwtService);
    sendOtp(email: string): Promise<{
        success: boolean;
        message: string;
        debugOtp?: string;
    }>;
    verifyOtp(email: string, otp: string): Promise<{
        accessToken: string;
        user: {
            email: string;
            role: string;
        };
    }>;
    adminLogin(email: string, password: string): Promise<{
        accessToken: string;
        admin: {
            email: string;
            role: string;
        };
    }>;
}
