import { Injectable } from '@nestjs/common'

@Injectable()
export class AppService {
  getRoutes(): string {
    return `{
      "0": "GET   /",
      "1": "POST /users/register",
      "2": "POST /users/login",
      '3': 'GET /user/:id',
    }`
  }
}
