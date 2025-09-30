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
    const { avatar, theme } = createUserProfile
    return this.userService.createProfile(currentUser.id, { avatar, theme })
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
    const { avatar, theme } = updateUserProfile
    return this.userService.updateProfile(currentUser.id, { avatar, theme })
  }

  @Delete()
  async deleteProfile(
    @CurrentUser() currentUser: UserPayload) {
    return this.userService.deleteProfile(currentUser.id)
  }
}
