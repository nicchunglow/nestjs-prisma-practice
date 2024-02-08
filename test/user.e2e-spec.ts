import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { UserService } from '../src/user/user.service'
import { PrismaService } from '../prisma.service'
import { AppModule } from './../src/app.module'

describe('UserController (e2e)', () => {
  let app: INestApplication

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  afterEach(async () => {
    jest.resetAllMocks()
  })
  afterAll(async () => {
    await app.close()
  })

  describe('/users (POST)', () => {
    it('should create a new user', async () => {
      const userData = {
        name: 'TestUser',
        email: 'test@email.gov',
        agency: 'ACRA',
        description: 'I am a test officer',
        acceptTerms: true,
      }

      const result = { id: 1, ...userData }

      jest.spyOn(app.get(UserService), 'createUser').mockResolvedValue(result)

      const response = await request(app.getHttpServer())
        .post('/users')
        .send(userData)
        .expect(201)

      expect(response.body).toEqual(result)
    })
    it('should not create a new user with missing information', async () => {
      const userData = {
        name: '',
        email: 'test@email.gova',
        agency: 'ACRA',
        description: 'I am a test officer',
        acceptTerms: false,
      }

      const { body: error } = await request(app.getHttpServer())
        .post('/users')
        .set('Accept', 'application/json')
        .send(userData)
        .expect(422)
      expect(error.message).toBe('name should be valid format')
    })
  })
})
