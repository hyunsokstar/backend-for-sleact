import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModel } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [
    PassportModule, // Passport 모듈 등록
    TypeOrmModule.forFeature([UsersModel]),
    JwtModule.register({
      secret: 'terecal', // JWT 시크릿 키
      signOptions: { expiresIn: '1h' }, // 토큰 만료 시간 설정
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UsersService, LocalStrategy],
})
export class AuthModule { }
