import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './entities/product.entity';
import { CategoryService } from '../category/category.service';

export type ProductRepository = Repository<Product>;
@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: ProductRepository,

    private readonly categoryService: CategoryService,
  ) {}

  async create(createProductDto: CreateProductDto) {
    await this.categoryService.findById(createProductDto.categoryId);

    return this.productRepository.save({ ...createProductDto });
  }

  async findAll(): Promise<Product[]> {
    const products = await this.productRepository.find();

    if (!products || products.length === 0) {
      throw new NotFoundException(`Products Not Found`);
    }

    return products;
  }

  async findById(id: number): Promise<Product> {
    const product = await this.productRepository.findOne({ where: { id } });

    if (!product) {
      throw new NotFoundException(`ProductId: ${id} not found`);
    }

    return product;
  }

  async remove(id: number): Promise<DeleteResult> {
    await this.findById(id);

    return await this.productRepository.delete({ id });
  }
}
