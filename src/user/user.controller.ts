import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';
import { UserService } from './user.service';
import { ReturnUserDto } from './dtos/returnUser.dto';
import { UpdatePasswordDto } from './dtos/update-password.dto';
import { UserId } from '../decorators/user-id.decorator';
import { Roles } from '../decorators/roles.decorator';
import { UserType } from './enum/user-type.enum';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UsePipes(ValidationPipe)
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Roles(UserType.Admin)
  @Get()
  async getAll(): Promise<ReturnUserDto[]> {
    const users = await this.userService.getAll();

    return users.map((user) => new ReturnUserDto(user));
  }

  @Roles(UserType.Admin)
  @Get('/:userId')
  async getOneById(@Param('userId') userId: number): Promise<ReturnUserDto> {
    const user = await this.userService.getUserByIdUsingRelations(userId);

    return new ReturnUserDto(user);
  }

  @Roles(UserType.User, UserType.Admin)
  @Patch()
  @UsePipes(ValidationPipe)
  async updatePassword(
    @UserId() userId: number,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ): Promise<ReturnUserDto> {
    const user = await this.userService.updatePassword(
      updatePasswordDto,
      userId,
    );

    return new ReturnUserDto(user);
  }
}
