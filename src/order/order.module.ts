import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { Order } from './entities/order.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderController } from './order.controller';
import { PaymentModule } from '../payment/payment.module';
import { CartModule } from '../cart/cart.module';
import { OrderProductModule } from '../order-product/order-product.module';
import { ProductModule } from '../product/product.module';
import { AddressModule } from '../address/address.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order]),
    PaymentModule,
    CartModule,
    OrderProductModule,
    ProductModule,
    AddressModule,
  ],
  providers: [OrderService],
  controllers: [OrderController],
})
export class OrderModule {}
