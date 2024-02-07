import { Controller, Post, Body } from '@nestjs/common'
import { UserService } from './user.service'
import { User as UserModel } from '@prisma/client'
import { User } from 'src/user/user.type'
import { userSchema } from './user.schema'

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('user')
  async createUser(@Body() userData: User): Promise<UserModel> {
    try {
      const validatedData = await userSchema.validateAsync(userData)
      return this.userService.createUser(validatedData)
    } catch (err) {
      throw new Error(err.message)
    }
  }
}
