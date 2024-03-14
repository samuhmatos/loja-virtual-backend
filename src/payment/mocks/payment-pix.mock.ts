import { PaymentPix } from '../entities/payment-pix.entity';
import { paymentMock } from './payment.mock';

export const paymentPixMock: PaymentPix = {
  code: 'asd',
  datePayment: new Date('2020-03-12'),
  ...paymentMock,
};
