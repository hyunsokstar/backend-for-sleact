import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { UsersModule } from './users/users.module';
import { UsersModel } from './users/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';


console.log("hi", join(__dirname, '../../', '.env'));
// sleact\a-nest\.env


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '1234',
      database: 'sleact_db',
      entities: [UsersModel],
      synchronize: true,
      // logging: true,
      // charset: 'utf8mb4'
    }),

    ConfigModule.forRoot({
      envFilePath: join(__dirname, '../../', '.env'), // .env 파일의 경로 지정
      isGlobal: true,
    }),

    UsersModule,
    AuthModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})

// export class AppModule { }
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes("*");
  }
}