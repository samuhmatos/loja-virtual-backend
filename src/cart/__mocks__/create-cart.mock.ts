import { productMock } from '../../product/__mocks__/product.mock';
import { CreateCartDto } from '../dtos/createCart.dto';

export const createCartMock: CreateCartDto = {
  amount: 123,
  productId: productMock.id,
};
