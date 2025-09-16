import { UserPayload } from './../../types/user.type';
import { Body, Controller, Get, Post, Put } from "@nestjs/common";
import { UserService } from "./user.service";
import { CurrentUser } from "../auth/decorators/current-user.decorator";
import { CreateUserProfileDTO } from './dto/create-user-profile.dto';
import { UpdateUserProfileDTO } from './dto/update-user-profile.dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post('profile')
    async createProfile(
        @CurrentUser() currentUser: UserPayload,
        @Body() createUserProfile: CreateUserProfileDTO) {
        return this.userService.createProfile(currentUser.id, createUserProfile)
    }

    @Get('profile')
    async getUserProfile(
        currentUser: UserPayload) {
        return this.userService.getProfileUser(currentUser.id)
    }

    @Put('profile')
    async updateProfile(
        @CurrentUser() currentUser : UserPayload,
        @Body() updateUserProfile : UpdateUserProfileDTO) {
        
        return this.userService.updateProfile(currentUser.id, updateUserProfile)
    }

}