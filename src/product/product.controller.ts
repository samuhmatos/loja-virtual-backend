import {
  Controller,
  Get,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  Delete,
  Param,
  Put,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { Roles } from '../decorators/roles.decorator';
import { UserType } from '../user/enum/user-type.enum';
import { ReturnProductDto } from './dto/returnProduct.dto';
import { Product } from './entities/product.entity';
import { DeleteResult } from 'typeorm';
import { UpdateProductDto } from './dto/update-product.dto';

@Roles(UserType.User, UserType.Admin)
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Roles(UserType.Admin)
  @Post()
  @UsePipes(ValidationPipe)
  async create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return this.productService.create(createProductDto);
  }

  @Get()
  async findAll(): Promise<ReturnProductDto[]> {
    const products = await this.productService.findAll([], true);

    return products.map((product) => new ReturnProductDto(product));
  }

  @Roles(UserType.Admin)
  @Delete('/:productId')
  async destroy(@Param('productId') productId: number): Promise<DeleteResult> {
    return this.productService.remove(productId);
  }

  @Roles(UserType.Admin)
  @Put('/:productId')
  @UsePipes(ValidationPipe)
  async update(
    @Param('productId') productId: number,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    return this.productService.update(updateProductDto, productId);
  }
}
