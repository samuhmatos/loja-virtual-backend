import { addressMock } from '../../address/__mocks__/address.mock';
import { Order } from '../entities/order.entity';
import { paymentMock } from '../../payment/mocks/payment.mock';
import { userMock } from '../../user/__mocks__/user.mock';

export const orderMock: Order = {
  id: 12,
  addressId: addressMock.id,
  date: new Date(),
  createdAt: new Date(),
  updatedAt: new Date(),
  paymentId: paymentMock.id,
  userId: userMock.id,
};
