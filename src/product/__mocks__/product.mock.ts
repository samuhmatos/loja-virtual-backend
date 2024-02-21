import { categoryMock } from '../../category/__mocks__/category.mock';
import { Product } from '../entities/product.entity';

export const productMock: Product = {
  id: 12,
  name: 'Novo produto',
  image: 'link:image',
  price: 40.5,
  categoryId: categoryMock.id,
  createdAt: new Date(),
  updatedAt: new Date(),
};
