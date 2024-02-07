import { Test, TestingModule } from '@nestjs/testing'
import { AppController } from './app.controller'
import { AppService } from './app.service'

describe('AppController', () => {
  let appController: AppController

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile()

    appController = app.get<AppController>(AppController)
  })

  describe('root', () => {
    it('should return the routes', () => {
      expect(appController.getRoutes()).toBe(`{
      "0": "GET   /",
      "1": "POST /users/register",
      "2": "POST /users/login",
      '3': 'GET /user/:id',
    }`)
    })
  })
})
