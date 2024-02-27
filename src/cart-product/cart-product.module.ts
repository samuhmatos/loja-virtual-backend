import { Module } from '@nestjs/common';
import { CartProductService } from './cart-product.service';

@Module({
  providers: [CartProductService]
})
export class CartProductModule {}
