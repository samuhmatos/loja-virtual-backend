import { Module } from '@nestjs/common';
import { CartProductService } from './cart-product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartProduct } from './entities/cart-product.entity';
import { ProductModule } from '../product/product.module';

@Module({
  imports: [TypeOrmModule.forFeature([CartProduct]), ProductModule],
  providers: [CartProductService],
  exports: [CartProductService],
})
export class CartProductModule {}
