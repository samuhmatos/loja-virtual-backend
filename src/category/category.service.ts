import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCategoryDto } from './dtos/createCategory.dto';

export type CategoryRepository = Repository<Category>;

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: CategoryRepository,
  ) {}

  async findAll(): Promise<Category[]> {
    const categories = await this.categoryRepository.find();

    if (!categories || categories.length === 0) {
      throw new NotFoundException('Categories not found');
    }

    return categories;
  }

  async create(createCategory: CreateCategoryDto): Promise<Category> {
    const category = await this.findByName(createCategory.name).catch(
      () => undefined,
    );

    if (category) {
      throw new BadRequestException(
        `Category name ${createCategory.name} already exists`,
      );
    }

    return this.categoryRepository.save({ ...createCategory });
  }

  async findByName(name: string): Promise<Category> {
    const category = await this.categoryRepository.findOne({ where: { name } });

    if (!category) {
      throw new NotFoundException(`CategoryName: ${name} not found`);
    }

    return category;
  }

  async findById(id: number): Promise<Category> {
    const category = await this.categoryRepository.findOne({ where: { id } });

    if (!category) {
      throw new NotFoundException(`CategoryName: ${name} not found`);
    }

    return category;
  }
}
