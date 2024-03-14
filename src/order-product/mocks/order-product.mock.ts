import { productMock } from '../../product/__mocks__/product.mock';
import { orderMock } from '../../order/mocks/order.mock';
import { OrderProduct } from '../entities/order-product.entity';

export const orderProductMock: OrderProduct = {
  amount: 234,
  createdAt: new Date(),
  updatedAt: new Date(),
  id: 3,
  orderId: orderMock.id,
  price: productMock.price,
  productId: productMock.id,
};
