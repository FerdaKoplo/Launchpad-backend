
import { Injectable, UnauthorizedException } from "@nestjs/common";
import prisma from "src/database/prisma/client";
import { comparePassword, hashPassword } from "src/utils/hash";
import { signAccessToken, signRefreshToken } from "src/utils/jwt";

@Injectable()
export class AuthService {
  async register(email: string, passsword: string, name: string) {
    const hasehd = await hashPassword(passsword)
    const user = await prisma.user.create({
      data: { email, password: hasehd, name }
    })

    await prisma.userProfile.create({
      data: { userId: user.id }
    })

    const accessToken = signAccessToken(user.id)
    const refreshToken = signRefreshToken(user.id)

    await prisma.refreshToken.create({
      data: {
        userId: user.id,
        token: refreshToken,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      }
    })

    return { user, accessToken, refreshToken }
  }

  async login(email: string, password: string) {
    const user = await prisma.user.findUnique({ where: { email } })
    if (!user)
      throw new UnauthorizedException('invalid credential')

    const valid = await comparePassword(password, user.password)
    if (!valid)
      throw new UnauthorizedException('invalid credential')

    const accessToken = signAccessToken(user.id)
    const refreshToken = signRefreshToken(user.id)

    await prisma.refreshToken.create({
      data: {
        userId: user.id,
        token: refreshToken,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      }
    })

    return { user, accessToken, refreshToken }

  }

  async refreshToken(oldToken: string) {
    const savedToken = await prisma.refreshToken.findUnique({
      where: { token: oldToken }
    })

    if (!savedToken || savedToken.revoked || savedToken.expiresAt < new Date())
      throw new UnauthorizedException('invalid refresh token')

    const newAccessToken = signAccessToken(savedToken.userId)
    const newRefreshToken = signRefreshToken(savedToken.userId)

    await prisma.refreshToken.update({
      where: {
        id: savedToken.id
      },
      data: {
        revoked: true
      }
    })

    await prisma.refreshToken.create({
      data: {
        userId: savedToken.userId,
        token: newRefreshToken,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      }
    })

    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken
    }
  }

  async logout(refreshToken: string) {
    await prisma.refreshToken.updateMany({
      where: { token: refreshToken },
      data: { revoked: true },
    })
  }
}
