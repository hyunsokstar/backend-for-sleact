import { Body, Controller, Get, HttpException, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { ApiBody, ApiCreatedResponse, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UsersModel } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { LocalAuthGuard } from 'src/guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
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
  // @Post('login')
  // async logIn(@Body() loginDto: LoginDto) {
  //   const { email, password } = loginDto;

  //   // 유효성 검사
  //   if (!email || !password) {
  //     throw new HttpException('이메일과 비밀번호를 모두 입력해주세요.', HttpStatus.BAD_REQUEST);
  //   }

  //   // 사용자 인증 및 JWT 발급
  //   const user = await this.authService.validateUser(email, password);
  //   if (!user) {
  //     throw new HttpException('유효한 사용자가 아닙니다.', HttpStatus.UNAUTHORIZED);
  //   }

  //   const payload = { email: user.email, sub: user.userId };
  //   const accessToken = this.jwtService.sign(payload);

  //   return { accessToken };
  // }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async logIn(@Req() req) { // Use Request object to access user object added by Passport
    return this.authService.login(req.user);
  }

  @ApiOperation({ summary: 'Sign Up' })
  @ApiBody({
    description: '회원 가입 정보',
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string', example: 'user@example.com' },
        password: { type: 'string', example: 'password123' },
      },
    },
  })
  @ApiCreatedResponse({ description: 'The user has been successfully created.', type: UsersModel })
  @Post('signup')
  async crateUser(@Body() user: Partial<UsersModel>) {
    try {
      const createdUser = await this.usersService.create(user);
      return { success: true, user: createdUser };

    } catch (error) {
      console.log("error : ", error);
      throw new HttpException(error.message, HttpStatus.CONFLICT);
    }
  }


}
