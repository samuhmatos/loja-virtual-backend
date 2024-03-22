import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, In, Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './entities/product.entity';
import { CategoryService } from '../category/category.service';
import { UpdateProductDto } from './dto/update-product.dto';

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

  async findAll(
    productId?: number[],
    isFindRelations?: boolean,
  ): Promise<Product[]> {
    let findOptions = {};

    if (productId && productId.length > 0) {
      findOptions = {
        where: {
          id: In(productId),
        },
      };
    }

    if (isFindRelations) {
      findOptions = {
        ...findOptions,
        relations: {
          category: true,
        },
      };
    }

    const products = await this.productRepository.find(findOptions);

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

  async update(
    updateProduct: UpdateProductDto,
    productId: number,
  ): Promise<Product> {
    const product = await this.findById(productId);

    return this.productRepository.save({
      ...product,
      ...updateProduct,
    });
  }
}
