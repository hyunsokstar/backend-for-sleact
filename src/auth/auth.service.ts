import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersModel } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UsersModel)
        private usersRepository: Repository<UsersModel>,
    ) { }

    async validateUser(email: string, password: string): Promise<any> {
        // 이메일과 일치하는 사용자를 데이터베이스에서 조회합니다.
        const user = await this.usersRepository.findOne({ where: { email } });

        // 사용자가 존재하지 않거나 비밀번호가 일치하지 않으면 null을 반환합니다.
        if (!user || !this.comparePasswords(password, user.password)) {
            return null;
        }

        // 사용자가 존재하고 비밀번호가 일치하면 사용자 객체를 반환합니다.
        return user;
    }

    // 비밀번호 비교 로직을 구현합니다.
    private comparePasswords(password: string, hashedPassword: string): boolean {
        // 비밀번호를 비교하여 일치하는지 확인합니다.
        // 여기에서는 비밀번호를 해시하지 않았다고 가정합니다.
        return password === hashedPassword;
    }

}