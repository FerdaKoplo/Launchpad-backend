import { Injectable, UnauthorizedException } from "@nestjs/common"
import prisma from "src/database/prisma/client"
import { comparePassword, hashPassword } from "src/utils/hash"
import { JwtService } from "../jwt/jwt.service"

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) { }

  async register(email: string, password: string, name: string) {
    const hashed = await hashPassword(password)
    const user = await prisma.user.create({
      data: { email, password: hashed, name },
    })

    await prisma.userProfile.create({ data: { userId: user.id } })

    const accessToken = this.jwtService.signAccessToken(user.id)
    const refreshToken = this.jwtService.signRefreshToken()

    await prisma.refreshToken.create({
      data: {
        userId: user.id,
        token: refreshToken,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    })

    return { user, accessToken, refreshToken }
  }

  async login(email: string, password: string) {
    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) throw new UnauthorizedException("invalid credential")

    const valid = await comparePassword(password, user.password)
    if (!valid) throw new UnauthorizedException("invalid credential")

    const accessToken = this.jwtService.signAccessToken(user.id)
    const refreshToken = this.jwtService.signRefreshToken()

    await prisma.refreshToken.create({
      data: {
        userId: user.id,
        token: refreshToken,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    })

    return { user, accessToken, refreshToken }
  }

  async refreshToken(oldToken: string) {
    const savedToken = await prisma.refreshToken.findUnique({
      where: { token: oldToken },
    })

    if (!savedToken || savedToken.revoked || savedToken.expiresAt < new Date()) {
      throw new UnauthorizedException("invalid refresh token")
    }

    const newAccessToken = this.jwtService.signAccessToken(savedToken.userId)
    const newRefreshToken = this.jwtService.signRefreshToken()

    await prisma.refreshToken.update({
      where: { id: savedToken.id },
      data: { revoked: true },
    })

    await prisma.refreshToken.create({
      data: {
        userId: savedToken.userId,
        token: newRefreshToken,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    })

    return { accessToken: newAccessToken, refreshToken: newRefreshToken }
  }

  async logout(refreshToken: string) {
    await prisma.refreshToken.updateMany({
      where: { token: refreshToken },
      data: { revoked: true },
    })
  }
}
