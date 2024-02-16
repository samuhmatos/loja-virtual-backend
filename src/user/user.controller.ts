import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';
import { UserService } from './user.service';
import { ReturnUserDto } from './dtos/returnUser.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UsePipes(ValidationPipe)
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  async getAll(): Promise<ReturnUserDto[]> {
    const users = await this.userService.getAll();

    return users.map((user) => new ReturnUserDto(user));
  }

  @Get('/:userId')
  async getOneById(@Param('userId') userId: number): Promise<ReturnUserDto> {
    const user = await this.userService.getUserByIdUsingRelations(userId);

    return new ReturnUserDto(user);
  }
}
