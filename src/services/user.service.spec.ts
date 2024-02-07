// services/user.service.spec.ts

import { Test, TestingModule } from '@nestjs/testing'
import { UserService } from './user.service'
import { PrismaService } from '../../prisma.service'
import { User, Prisma } from '@prisma/client'

describe('UserService', () => {
  let userService: UserService
  let prismaService: PrismaService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, PrismaService],
    }).compile()

    userService = module.get<UserService>(UserService)
    prismaService = module.get<PrismaService>(PrismaService)
  })

  describe('createUser', () => {
    it('should create a user', async () => {
      const userData = {
        name: 'Alice',
        email: 'alice@example.com',
      }
      const expectedResult: User = { id: 2, ...userData }

      jest.spyOn(prismaService.user, 'create').mockResolvedValue(expectedResult)

      const result = await userService.createUser(userData)

      expect(result).toEqual(expectedResult)
    })
  })
})
