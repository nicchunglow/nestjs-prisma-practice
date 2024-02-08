// services/user.service.spec.ts

import { User } from '@prisma/client'
import { Test, TestingModule } from '@nestjs/testing'
import { UserService } from './user.service'
import { PrismaService } from '../../prisma.service'

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

  const userData = {
    name: 'TestUser',
    email: 'test@email.gov',
    agency: 'ACRA',
    description: 'I am a test officer',
    acceptTerms: true,
  }
  describe('createUser', () => {
    it('should create a user', async () => {
      jest.spyOn(prismaService.user, 'findFirst').mockResolvedValue(null)

      jest
        .spyOn(prismaService.user, 'create')
        .mockResolvedValue({ id: 1, ...userData })

      const createdUser: User = await userService.createUser(userData)

      expect(createdUser).toBeDefined()
      expect(createdUser.id).toEqual(1)
      expect(createdUser.name).toEqual('TestUser')
      expect(createdUser.email).toEqual('test@email.gov')
    })

    it('should throw "Email already exist" for duplicate email', async () => {
      jest
        .spyOn(prismaService.user, 'findFirst')
        .mockResolvedValue({ id: 1, ...userData })

      await expect(userService.createUser(userData)).rejects.toThrow(
        'Email already exist'
      )
    })

    it('should throw for invalid data', async () => {
      const userData = {
        name: '',
        email: 'test@email.gov',
        agency: 'ACRA',
        description: 'I am a test officer',
        acceptTerms: false,
      }
      jest.spyOn(prismaService.user, 'findFirst').mockResolvedValue(null)

      await expect(userService.createUser(userData)).rejects.toThrow(
        'name should be valid format'
      )
    })
  })
  describe('loginUser', () => {
    it('should create a user', async () => {
      jest.spyOn(prismaService.user, 'findFirst').mockResolvedValue(null)

      jest
        .spyOn(prismaService.user, 'create')
        .mockResolvedValue({ id: 1, ...userData })

      const createdUser: User = await userService.createUser(userData)

      expect(createdUser).toBeDefined()
      expect(createdUser.id).toEqual(1)
    })
  })
})
