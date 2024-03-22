import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Order } from './entities/order.entity';
import { CreateOrderDto } from './dtos/create-order.dto';
import { PaymentService } from '../payment/payment.service';
import { CartService } from '../cart/cart.service';
import { OrderProductService } from '../order-product/order-product.service';
import { ProductService } from '../product/product.service';
import { Cart } from '../cart/entities/cart.entity';
import { OrderProduct } from '../order-product/entities/order-product.entity';
import { Product } from '../product/entities/product.entity';
import { AddressService } from '../address/address.service';

export type OrderRepository = Repository<Order>;
@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: OrderRepository,

    private readonly paymentService: PaymentService,
    private readonly cartService: CartService,
    private readonly orderProductService: OrderProductService,
    private readonly productService: ProductService,
    private readonly addressService: AddressService,
  ) {}

  async create(createOrderDto: CreateOrderDto, userId: number): Promise<Order> {
    await this.addressService.findByIdAndUserId(
      createOrderDto.addressId,
      userId,
    );

    const cart = await this.cartService.findByUserId(userId, true);
    const products = await this.productService.findAll(
      cart.cartProducts.map((cartProduct) => cartProduct.productId),
    );

    const payment = await this.paymentService.create(
      createOrderDto,
      products,
      cart,
    );

    const order = await this.createOrder(
      createOrderDto.addressId,
      payment.id,
      userId,
    );

    await this.createOrderProductUsingCart(cart, order.id, products);
    await this.cartService.clear(userId);

    return order;
  }

  async findAllByUSerId(userId: number): Promise<Order[]> {
    const orders = await this.orderRepository.find({
      where: { userId },
      relations: {
        address: true,
        ordersProduct: { product: true },
        payment: { paymentStatus: true },
      },
    });

    if (!orders || orders.length === 0) {
      throw new NotFoundException(`Orders not found`);
    }

    return orders;
  }

  async createOrderProductUsingCart(
    cart: Cart,
    orderId: number,
    products: Product[],
  ): Promise<OrderProduct[]> {
    return Promise.all(
      cart.cartProducts?.map((cartProduct) =>
        this.orderProductService.create(
          cartProduct.productId,
          orderId,
          products.find((product) => product.id === cartProduct.productId)
            ?.price || 0,
          cartProduct.amount,
        ),
      ),
    );
  }

  async createOrder(
    addressId: number,
    paymentId: number,
    userId: number,
  ): Promise<Order> {
    return this.orderRepository.save({
      addressId: addressId,
      date: new Date(),
      paymentId: paymentId,
      userId,
    });
  }
}
