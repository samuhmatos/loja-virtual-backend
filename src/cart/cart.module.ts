import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { Cart } from './entities/cart.entity';
import { CartProduct } from '../cart-product/entities/cart-product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cart, CartProduct])],
  providers: [CartService],
  controllers: [CartController],
})
export class CartModule {}
