import { CreateUserProfileDTO } from './dto/create-user-profile.dto';
import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { UpdateUserProfileDTO } from './dto/update-user-profile.dto';

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService) { }

    async createProfile(userId: string, createUserProfile: CreateUserProfileDTO) {
        return this.prisma.userProfile.create({
            data: {
                userId,
                avatar: createUserProfile.avatar,
                theme: createUserProfile.theme
            }
        })
    }

    async updateProfile(userId: string, updateUserProfile: UpdateUserProfileDTO) {
        return this.prisma.userProfile.update({
            where: { userId },
            data: {
                avatar: updateUserProfile.avatar,
                theme: updateUserProfile.theme
            }
        })
    }

    async deleteProfile(userId: string) {
        return this.prisma.userProfile.update({
            where: { userId },
            data: {
                deletedAt: new Date(),
            },
        })
    }
}