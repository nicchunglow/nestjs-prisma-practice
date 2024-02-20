import {
  Controller,
  Post,
  Body,
  Get,
  HttpException,
  HttpStatus,
} from '@nestjs/common'
import { UserService } from './user.service'
import { User as UserModel } from '@prisma/client'
import { User } from 'src/user/user.type'

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get('users')
  async getUsers(): Promise<UserModel[]> {
    try {
      const users = await this.userService.getUsers()
      return users
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
  @Post('users')
  async createUser(@Body() userData: User): Promise<UserModel> {
    try {
      return this.userService.createUser(userData)
    } catch (err) {
      throw new Error(err)
    }
  }
}
