import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { ReturnCategoryDto } from './dtos/returnCategory.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { UserType } from 'src/user/enum/user-type.enum';
import { CreateCategoryDto } from './dtos/createCategory.dto';
import { Category } from './entities/category.entity';

@Roles(UserType.Admin, UserType.User)
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async findAll(): Promise<ReturnCategoryDto[]> {
    const categories = await this.categoryService.findAll();

    return categories.map((category) => new ReturnCategoryDto(category));
  }

  @UsePipes(ValidationPipe)
  @Post()
  @Roles(UserType.Admin)
  async create(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    const category = await this.categoryService.create(createCategoryDto);
    return category;
  }
}
