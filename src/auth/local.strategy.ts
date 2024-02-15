// src\auth\local.strategy.ts

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { Strategy } from 'passport-local'; // Strategy import 추가


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super({
            usernameField: 'email', // 이메일 필드를 사용자의 식별자로 설정
            passwordField: 'password', // 비밀번호 필드 설정
        });
    }

    async validate(email: string, password: string): Promise<any> {
        return this.authService.validateUser(email, password);
    }
}

