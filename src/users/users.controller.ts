import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBody, ApiCreatedResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserDto } from './dto/user.dto';
import { UsersModel } from './entities/user.entity';

@ApiTags('Users')
@Controller('users')
export class UsersController {

  constructor(private readonly usersService: UsersService) { }


}
