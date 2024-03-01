import { ChildEntity, Column } from 'typeorm';
import { Payment } from './payment.entity';

@ChildEntity()
export class PaymentPix extends Payment {
  @Column({ name: 'code', nullable: false })
  code: number;

  @Column({ name: 'date_payment', nullable: false })
  datePayment: Date;
}
