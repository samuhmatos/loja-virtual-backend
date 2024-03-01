import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateOrderDto } from './dtos/create-order.dto';
import { PaymentService } from '../payment/payment.service';

export type OrderRepository = Repository<Order>;
@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: OrderRepository,

    private readonly paymentService: PaymentService,
  ) {}

  async create(createOrderDto: CreateOrderDto, cartId: number): Promise<any> {
    await this.paymentService.create(createOrderDto);
  }
}
