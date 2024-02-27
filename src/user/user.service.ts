import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UserType } from './enum/user-type.enum';
import { UpdatePasswordDto } from './dtos/update-password.dto';
import { password } from '../utils/password';

export type UserRepository = Repository<User>;
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: UserRepository,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.findByEmail(createUserDto.email).catch(
      () => undefined,
    );

    if (user) {
      throw new BadRequestException('Email already is registered');
    }

    const hashedPassword = await password.createHash(createUserDto.password);

    return this.userRepository.save({
      ...createUserDto,
      typeUser: UserType.User,
      password: hashedPassword,
    });
  }

  async getAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findById(userId: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new NotFoundException(`UserId: ${userId} Not Found `);
    }

    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      throw new NotFoundException(`User email: ${email} Not Found `);
    }

    return user;
  }

  async getUserByIdUsingRelations(userId: number): Promise<User> {
    return this.userRepository.findOne({
      where: { id: userId },
      relations: {
        addresses: {
          city: {
            state: true,
          },
        },
      },
    });
  }

  async updatePassword(
    updatePassword: UpdatePasswordDto,
    id: number,
  ): Promise<User> {
    const user = await this.findById(id);

    const matchPassword = await password.validate(
      updatePassword.lastPassword,
      user.password || '',
    );

    if (!matchPassword) {
      throw new BadRequestException(`Last password is invalid`);
    }

    const hashedPassword = await password.createHash(
      updatePassword.newPassword,
    );

    return this.userRepository.save({
      ...user,
      password: hashedPassword,
    });
  }
}
