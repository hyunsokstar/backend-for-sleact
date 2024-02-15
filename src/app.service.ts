import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) { }

  private count: number = 0;

  getCountNum(): string {
    this.count++; // 요청이 들어올 때마다 count를 증가시킵니다.
    return `Count: ${this.count}`;
  }

  getHello(): string {
    const cheatKey = process.env.CHEATKEY;
    // console.log(process.env);
    // console.log(cheatKey);

    // const cheatKey = this.configService.get<string>('CHEATKEY');
    // console.log("get env by service");
    return `Hello ${cheatKey}`;
  }
}
