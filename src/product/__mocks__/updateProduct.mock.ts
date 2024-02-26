import { categoryMock } from '../../category/__mocks__/category.mock';
import { UpdateProductDto } from '../dto/update-product.dto';

export const updateProductMock: UpdateProductDto = {
  name: 'new product name',
  categoryId: categoryMock.id,
  image: 'http://newImage.com',
  price: 30,
};
