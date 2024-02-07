import { User, Prisma } from '@prisma/client'
import { Injectable, UnprocessableEntityException } from '@nestjs/common'
import { PrismaService } from '../../prisma.service'

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    try {
      const userEmail = await this.prisma.user.findFirst({
        where: { email: data.email },
        select: { email: true },
      })

      if (userEmail) {
        throw new UnprocessableEntityException('Email already exists')
      }

      return this.prisma.user.create({
        data,
      })
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        throw new UnprocessableEntityException(
          'Error creating user: ' + err.message
        )
      }

      throw new Error(err.message)
    }
  }
}
