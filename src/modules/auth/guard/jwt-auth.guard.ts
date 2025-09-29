import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { TokenPayload, verifyToken } from "src/utils/jwt";


interface AuthRequest extends Request {
  user?: TokenPayload
}

@Injectable()
export class JWtAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<AuthRequest>()
    const authHeader = request.headers['authorization']

    if (!authHeader)
      throw new UnauthorizedException('Missing Authorization header')

    const [bearer, token] = authHeader.split(' ')

    if (bearer !== 'Bearer' || !token)
      throw new UnauthorizedException('Invalid Authorization header')

    try {
      const payload = verifyToken(token, 'access')
      request.user = payload
      return true
    } catch (err: any) {
      throw new UnauthorizedException('Invalid or expired token', err)
    }
  }
}
