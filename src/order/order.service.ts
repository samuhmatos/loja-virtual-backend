import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Order } from './entities/order.entity';
import { CreateOrderDto } from './dtos/create-order.dto';
import { PaymentService } from '../payment/payment.service';
import { CartService } from '../cart/cart.service';
import { OrderProductService } from '../order-product/order-product.service';

export type OrderRepository = Repository<Order>;
@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: OrderRepository,

    private readonly paymentService: PaymentService,
    private readonly cartService: CartService,
    private readonly orderProductService: OrderProductService,
  ) {}

  async create(
    createOrderDto: CreateOrderDto,
    cartId: number,
    userId: number,
  ): Promise<any> {
    const payment = await this.paymentService.create(createOrderDto);

    const order = await this.orderRepository.save({
      addressId: createOrderDto.addressId,
      date: new Date(),
      paymentId: payment.id,
      userId,
    });

    const cart = await this.cartService.findByUserId(userId, true);

    cart.cartProducts?.forEach(async (cartProduct) => {
      await this.orderProductService.create(
        cartProduct.productId,
        order.id,
        0,
        cartProduct.amount,
      );
    });
  }
}
