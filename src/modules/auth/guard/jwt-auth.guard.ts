import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common"
import { JwtService, TokenPayload } from "src/modules/jwt/jwt.service"

interface AuthRequest extends Request {
  user?: TokenPayload
}

@Injectable()
export class JWtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) { }

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<AuthRequest>()
    const authHeader = request.headers['authorization']

    if (!authHeader)
      throw new UnauthorizedException('Missing Authorization header')

    const [bearer, token] = authHeader.split(' ')

    if (bearer !== 'Bearer' || !token)
      throw new UnauthorizedException('Invalid Authorization header')

    try {
      const payload = this.jwtService.verifyToken(token, 'access')
      request.user = payload
      return true
    } catch {
      throw new UnauthorizedException('Invalid or expired token')
    }
  }
}
