import { ReturnCategoryDto } from '../dtos/returnCategory.dto';
import { categoryMock } from './category.mock';

export const returnCategoryMock: ReturnCategoryDto = {
  id: categoryMock.id,
  name: categoryMock.name,
};
