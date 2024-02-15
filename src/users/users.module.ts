import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModel } from './entities/user.entity';

@Module({
  // imports: [
  //   PassportModule,
  //   JwtModule.register({
  //     secret: "terecal",
  //     signOptions: { expiresIn: '60s' },
  //   }),
  // ],
  imports: [
    TypeOrmModule.forFeature([UsersModel])
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService] // UsersService를 exports 배열에 추가

})
export class UsersModule { }
