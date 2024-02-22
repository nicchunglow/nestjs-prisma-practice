import { User, Prisma } from '@prisma/client'
import {
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common'
import { PrismaService } from '../../prisma.service'
import { userSchema } from './user.schema'

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  private async validateUserData(data: Prisma.UserCreateInput): Promise<void> {
    try {
      await userSchema.validateAsync(data, { abortEarly: false })
    } catch (validationError) {
      throw new UnprocessableEntityException(validationError.message)
    }
  }

  private async checkIfEmailExists(email: string): Promise<void> {
    const userEmail = await this.prisma.user.findFirst({
      where: { email },
      select: { email: true },
    })

    if (userEmail) {
      throw new UnprocessableEntityException('Email already exists')
    }
  }

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    try {
      await this.validateUserData(data)

      await this.checkIfEmailExists(data.email)

      return this.prisma.user.create({
        data,
      })
    } catch (err) {
      throw err
    }
  }
  async loginUser(data: Prisma.UserFindFirstArgs): Promise<User | null> {
    try {
      const user = await this.prisma.user.findFirst({
        where: { email: data.where?.email },
      })

      if (!user) {
        throw new UnauthorizedException('Login failed')
      }

      return user
    } catch (err) {
      throw err
    }
  }
  async getUsers(): Promise<User[]> {
    try {
      return await this.prisma.user.findMany()
    } catch (err) {
      throw err
    }
  }
}
