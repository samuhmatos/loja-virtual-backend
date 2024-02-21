import {
  Controller,
  Get,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { Roles } from '../decorators/roles.decorator';
import { UserType } from '../user/enum/user-type.enum';
import { ReturnProductDto } from './dto/returnProduct.dto';
import { Product } from './entities/product.entity';

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
    const products = await this.productService.findAll();

    return products.map((product) => new ReturnProductDto(product));
  }
}
