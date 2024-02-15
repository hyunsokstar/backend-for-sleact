import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from '@nestjs/class-validator';

export class CreateUserDto {
    @ApiProperty({ description: '사용자 ID' })
    @IsString()
    @IsNotEmpty()
    id: string;

    @ApiProperty({ description: '이메일 주소' })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({ description: '비밀번호', minLength: 8 })
    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    password: string;
}
