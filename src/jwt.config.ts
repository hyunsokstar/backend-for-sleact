// jwt.config.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

export const jwtConstants = {
    secret: 'your-secret-key', // JWT 토큰을 서명하기 위한 시크릿 키
};

@Module({
    imports: [JwtModule.register({
        secret: jwtConstants.secret,
        signOptions: { expiresIn: '60s' }, // 토큰의 만료 시간 설정
    })],
})
export class JwtConfigModule { }
