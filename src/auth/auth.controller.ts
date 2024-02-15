import { Body, Controller, Get, HttpException, HttpStatus, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { ApiBody, ApiResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) { }


  @ApiBody({ type: LoginDto, description: '사용자 이메일과 비밀번호' }) // 요청 본문에 대한 설명 추가
  @ApiResponse({ status: 201, description: '성공적으로 로그인되었습니다.' })
  @ApiResponse({ status: 400, description: '이메일 또는 비밀번호를 입력하세요.' })
  @ApiResponse({ status: 401, description: '유효하지 않은 사용자입니다.' })
  @ApiBody({
    type: LoginDto,
    description: '사용자 이메일과 비밀번호',
    examples: {
      example1: {
        value: {
          email: 'terecal1@daum.net',
          password: '1234',
        },
        description: '로그인 요청 예제'
      }
    }
  }) // 요청 본문에 대한 설명 및 예제 추가
  @Post('login')
  async logIn(@Body() loginDto: LoginDto) {
    const { email, password } = loginDto;

    // 유효성 검사
    if (!email || !password) {
      throw new HttpException('이메일과 비밀번호를 모두 입력해주세요.', HttpStatus.BAD_REQUEST);
    }

    // 사용자 인증 및 JWT 발급
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      throw new HttpException('유효한 사용자가 아닙니다.', HttpStatus.UNAUTHORIZED);
    }

    const payload = { email: user.email, sub: user.userId };
    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }

}
