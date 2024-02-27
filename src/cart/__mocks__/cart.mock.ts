import { userMock } from '../../user/__mocks__/user.mock';
import { Cart } from '../entities/cart.entity';

export const cartMock: Cart = {
  id: 12,
  active: true,
  userId: userMock.id,
  createdAt: new Date(),
  updatedAt: new Date(),
};
