import { PaymentCreditCard } from '../entities/payment-credit-cart.entity';
import { paymentMock } from './payment.mock';

export const paymentCreditCardMock: PaymentCreditCard = {
  amountPayments: 32,
  ...paymentMock,
};
