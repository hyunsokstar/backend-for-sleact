import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
    // @ApiProperty({ description: '사용자 ID' })
    id: number;

    // @ApiProperty({ description: '이메일 주소' })
    email: string;

    // @ApiProperty({ description: '별명' })
    nickname: string;
}
