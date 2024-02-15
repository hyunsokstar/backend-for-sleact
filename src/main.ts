import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as passport from 'passport'; // Passport를 import

async function bootstrap() {
  const PORT = 9090; // 포트 번호를 상수로 정의합니다.
  const app = await NestFactory.create(AppModule);

  // app.useGlobalPipes(new ValidationPipe());
  // // Passport 초기화
  // app.use(passport.initialize());
  // // JwtStrategy 사용
  // app.use(passport.authenticate('jwt', { session: false }));

  const config = new DocumentBuilder()
    .setTitle('Sleact API')
    .setDescription('Sleact 개발을 위한 API 문서')
    .setVersion('1.0')
    .addCookieAuth('connect.sid')
    .build()

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(PORT);

  console.log(`Application is running on port ${PORT}`);
}

bootstrap();
