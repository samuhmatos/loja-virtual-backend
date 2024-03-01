import { ChildEntity, Column } from 'typeorm';
import { Payment } from './payment.entity';
import { CreateOrderDto } from '../../order/dtos/create-order.dto';

@ChildEntity()
export class PaymentCreditCard extends Payment {
  @Column({ name: 'amount_payments', nullable: false })
  amountPayments: number;

  constructor(
    statusId: number,
    price: number,
    discount: number,
    finalPrice: number,
    createOrderDto: CreateOrderDto,
  ) {
    super(statusId, price, discount, finalPrice);

    this.amountPayments = createOrderDto?.amountPayments || 0;
  }
}
