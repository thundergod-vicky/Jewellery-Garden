import { AuthService } from "./auth.service";
export declare class SendOtpDto {
    email: string;
}
export declare class VerifyOtpDto {
    email: string;
    otp: string;
}
export declare class AdminLoginDto {
    email: string;
    password: string;
}
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    sendOtp(dto: SendOtpDto): Promise<{
        success: boolean;
        message: string;
        debugOtp?: string;
    }>;
    verifyOtp(dto: VerifyOtpDto): Promise<{
        accessToken: string;
        user: {
            email: string;
            role: string;
        };
    }>;
    adminLogin(dto: AdminLoginDto): Promise<{
        accessToken: string;
        admin: {
            email: string;
            role: string;
        };
    }>;
}
