import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Payment } from './entities/payment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateOrderDto } from '../order/dtos/create-order.dto';
import { PaymentCreditCard } from './entities/payment-credit-cart.entity';
import { PaymentType } from './enums/payment-type.enum';
import { PaymentPix } from './entities/payment-pix.entity';

export type PaymentRepository = Repository<Payment>;
@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: PaymentRepository,
  ) {}

  create(createOrderDto: CreateOrderDto): Promise<Payment> {
    if (createOrderDto.amountPayments) {
      const paymentCreditCard = new PaymentCreditCard(
        PaymentType.Done,
        0,
        0,
        0,
        createOrderDto,
      );

      return this.paymentRepository.save(paymentCreditCard);
    } else if (createOrderDto.codePix && createOrderDto.datePayment) {
      const paymentPix = new PaymentPix(
        PaymentType.Done,
        0,
        0,
        0,
        createOrderDto,
      );

      return this.paymentRepository.save(paymentPix);
    }

    throw new BadRequestException(
      `Amount payments or code pix or date payment not found`,
    );
  }
}
