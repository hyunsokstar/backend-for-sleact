import { Injectable } from '@nestjs/common';

import { User } from 'src/common/decorators/user.decorator';
import { UserDto } from './dto/user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersModel } from './entities/user.entity';
import { Repository } from 'typeorm';
import { ApiBody, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';

export type User = any;

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(UsersModel)
    private usersRepository: Repository<UsersModel>
  ) { }

  async create(user: Partial<UsersModel>): Promise<User> {
    return await this.usersRepository.save(user);
  }

  async findByUsername(email: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { email: email } });
  }

  async findOne(email: string): Promise<User | undefined> {
    return this.usersRepository.find({ where: { email: email } });
  }


}
