import {
  Controller,
  Post,
  Body,
  UnprocessableEntityException,
} from '@nestjs/common'
import { UserService } from './user.service'
import { User as UserModel } from '@prisma/client'
import { User } from 'src/user/user.type'

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('user')
  async createUser(@Body() userData: User): Promise<UserModel> {
    try {
      return this.userService.createUser(userData)
    } catch (err) {
      throw err
    }
  }
}
