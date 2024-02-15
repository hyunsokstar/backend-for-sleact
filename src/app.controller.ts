// import { Controller, Get } from '@nestjs/common';
// import { AppService } from './app.service';

// @Controller()
// export class AppController {
//   constructor(private readonly appService: AppService) { }

//   @Get()
//   getHello(): string {
//     return this.appService.getHello();
//   }

//   @Get('/countTest')
//   getCountNum(): string {
//     return this.appService.getCountNum();
//   }

// }

import { Controller, Request, Post, UseGuards, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AppController {
  // @Post('auth/login')
  // async login(@Request() req) {
  //   return req.user;
  // }

  @Get("/")
  async hello() {
    return "hello"
  }

}