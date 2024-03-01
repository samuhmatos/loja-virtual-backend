import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { OrderProduct } from './entities/order-product.entity';
import { InjectRepository } from '@nestjs/typeorm';

export type OrderProductRepository = Repository<OrderProduct>;

@Injectable()
export class OrderProductService {
  constructor(
    @InjectRepository(OrderProduct)
    private readonly orderProductRepository: OrderProductRepository,
  ) {}

  async create(
    productId: number,
    orderId: number,
    price: number,
    amount: number,
  ): Promise<OrderProduct> {
    return this.orderProductRepository.save({
      productId,
      amount,
      orderId,
      price,
    });
  }
}
