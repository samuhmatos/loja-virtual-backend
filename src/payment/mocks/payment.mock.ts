import { Payment } from '../entities/payment.entity';
import { PaymentType } from '../enums/payment-type.enum';

export const paymentMock: Payment = {
  id: 1,
  createdAt: new Date(),
  updatedAt: new Date(),
  discount: 23,
  finalPrice: 324,
  price: 312,
  statusId: PaymentType.Done,
  type: '',
};
