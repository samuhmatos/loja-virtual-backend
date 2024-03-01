import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Payment } from './entities/payment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateOrderDto } from '../order/dtos/create-order.dto';
import { PaymentCreditCard } from './entities/payment-credit-cart.entity';
import { PaymentType } from './enums/payment-type.enum';
import { PaymentPix } from './entities/payment-pix.entity';
import { Product } from '../product/entities/product.entity';
import { Cart } from '../cart/entities/cart.entity';

export type PaymentRepository = Repository<Payment>;
@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: PaymentRepository,
  ) {}

  private generateFinalPrice(products: Product[], cart: Cart): number {
    if (!cart.cartProducts || cart.cartProducts.length === 0) {
      return 0;
    }

    return cart.cartProducts.reduce((accumulator, cartProduct) => {
      const product = products.find(
        (product) => product.id === cartProduct.productId,
      );

      if (product) {
        return cartProduct.amount * product.price + accumulator;
      }

      return 0;
    }, 0);
  }

  create(
    createOrderDto: CreateOrderDto,
    products: Product[],
    cart: Cart,
  ): Promise<Payment> {
    const finalPrice = this.generateFinalPrice(products, cart);

    if (createOrderDto.amountPayments) {
      const paymentCreditCard = new PaymentCreditCard(
        PaymentType.Done,
        finalPrice,
        0,
        finalPrice,
        createOrderDto,
      );

      return this.paymentRepository.save(paymentCreditCard);
    } else if (createOrderDto.codePix && createOrderDto.datePayment) {
      const paymentPix = new PaymentPix(
        PaymentType.Done,
        finalPrice,
        0,
        finalPrice,
        createOrderDto,
      );

      return this.paymentRepository.save(paymentPix);
    }

    throw new BadRequestException(
      `Amount payments or code pix or date payment not found`,
    );
  }
}
