import { cartMock } from '../../cart/__mocks__/cart.mock';
import { productMock } from '../../product/__mocks__/product.mock';
import { CartProduct } from '../entities/cart-product.entity';

export const cartProductMock: CartProduct = {
  id: 1,
  amount: 21,
  cartId: cartMock.id,
  productId: productMock.id,

  createdAt: new Date(),
  updatedAt: new Date(),
};
