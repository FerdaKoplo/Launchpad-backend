import { UserPayload } from './../../types/user.type';
import { Body, Controller, Delete, Get, Post, Put } from "@nestjs/common";
import { UserService } from "./user.service";
import { CurrentUser } from "../auth/decorators/current-user.decorator";
import { CreateUserProfileDTO } from './dto/create-user-profile.dto';
import { UpdateUserProfileDTO } from './dto/update-user-profile.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  async createProfile(
    @CurrentUser() currentUser: UserPayload,
    @Body() createUserProfile: CreateUserProfileDTO) {
    return this.userService.createProfile(currentUser.id, createUserProfile)
  }

  @Get()
  async getUserProfile(
    currentUser: UserPayload) {
    return this.userService.getProfileUser(currentUser.id)
  }

  @Put()
  async updateProfile(
    @CurrentUser() currentUser: UserPayload,
    @Body() updateUserProfile: UpdateUserProfileDTO) {

    return this.userService.updateProfile(currentUser.id, updateUserProfile)
  }

  @Delete()
  async deleteProfile(
    @CurrentUser() currentUser: UserPayload) {
    return this.userService.deleteProfile(currentUser.id)
  }
}
