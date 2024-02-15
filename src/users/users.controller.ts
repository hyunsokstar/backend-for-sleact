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

  private readonly usersInfo = [
    { id: 1, email: "terecal@daum.net", nickname: "hyun1" },
    { id: 2, email: "terecal2@daum.net", nickname: "hyun2" }
  ];

  constructor(private readonly usersService: UsersService) { }

  @ApiOperation({ summary: 'Create a new user' })
  @ApiBody({
    description: 'User information',
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string', example: 'user@example.com' },
        password: { type: 'string', example: 'password123' },
      },
    },
  })
  @ApiCreatedResponse({ description: 'The user has been successfully created.', type: UsersModel })
  @Post()
  async crateUser(@Body() user: Partial<UsersModel>) {
    try {
      const createdUser = await this.usersService.create(user);
      return { success: true, user: createdUser };

    } catch (error) {
      console.log("error : ", error);
      throw new HttpException(error.message, HttpStatus.CONFLICT);
    }
  }


}
