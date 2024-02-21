import { Category } from '../entities/category.entity';

export class ReturnCategoryDto {
  id: number;
  name: string;

  constructor(category: Category) {
    this.id = category.id;
    this.name = category.name;
  }
}
