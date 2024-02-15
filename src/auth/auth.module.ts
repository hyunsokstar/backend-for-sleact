import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModel } from 'src/users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsersModel]),
    JwtModule.register({
      secret: 'terecal', // JWT 시크릿 키
      signOptions: { expiresIn: '1h' }, // 토큰 만료 시간 설정
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule { }
