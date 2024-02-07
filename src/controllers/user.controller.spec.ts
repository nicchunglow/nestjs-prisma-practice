import { Test, TestingModule } from '@nestjs/testing'
import { UserController } from './user.controller'
import { UserService } from '../services/user.service'
import { PrismaService } from '../../prisma.service'

describe('UserController', () => {
  let service: UserService
  let controller: UserController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService, PrismaService],
    }).compile()

    service = module.get<UserService>(UserService)
    controller = module.get<UserController>(UserController)
  })

  describe('User', () => {
    describe('POST', () => {
      it('should create user', async () => {
        const result = { id: 1, name: 'hi', email: 'hi@email.abc' }

        jest.spyOn(service, 'createUser').mockResolvedValue(result)

        const response = await controller.createUser({
          name: 'hi',
          email: 'email',
        })

        expect(response).toEqual(result)
      })
    })
  })
})
