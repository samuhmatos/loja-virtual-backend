import { CreateProductDto } from '../dto/create-product.dto';
import { productMock } from './product.mock';

export const createProductMock: CreateProductDto = {
  name: productMock.name,
  categoryId: productMock.categoryId,
  image: productMock.image,
  price: productMock.price,
};
