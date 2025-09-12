import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { RegisterDTO } from "../dto/auth/register.dto";
import { LoginDTO } from "../dto/auth/login.dto";
import { RefreshTokenDTO } from "../dto/auth/refresh.dto";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('register')
    async register(@Body() body: RegisterDTO) {
        const { email, name, password } = body
        return this.authService.register(email, password, name)
    }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    async login(@Body() body: LoginDTO) {
        const { email, password } = body
        return this.authService.login(email, password)

    }

    @Post('refresh')
    @HttpCode(HttpStatus.OK)
    async refresh(@Body() body: RefreshTokenDTO) {
        const { refreshToken } = body;
        return this.authService.refreshToken(refreshToken);
    }

    @Post('logout')
    @HttpCode(HttpStatus.NO_CONTENT)
    async logout(@Body() body: RefreshTokenDTO) {
        const { refreshToken } = body;
        await this.authService.logout(refreshToken);
    }

}