import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { Order } from './entities/order.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderController } from './order.controller';
import { PaymentModule } from 'src/payment/payment.module';

@Module({
  imports: [TypeOrmModule.forFeature([Order]), PaymentModule],
  providers: [OrderService],
  controllers: [OrderController],
})
export class OrderModule {}
