import { paymentPixMock } from '../../payment/mocks/payment-pix.mock';
import { addressMock } from '../../address/__mocks__/address.mock';
import { CreateOrderDto } from '../dtos/create-order.dto';
import { paymentCreditCardMock } from '../../payment/mocks/payment-credit-card.mock';

export const createOrderPixMock: CreateOrderDto = {
  addressId: addressMock.id,
  codePix: paymentPixMock.code,
  datePayment: '2020-03-12',
};

export const createOrderCreditCardMock: CreateOrderDto = {
  addressId: addressMock.id,
  amountPayments: paymentCreditCardMock.amountPayments,
};
