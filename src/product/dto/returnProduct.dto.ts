import { ReturnCategoryDto } from '../../category/dtos/returnCategory.dto';
import { Product } from '../entities/product.entity';

export class ReturnProductDto {
  id: number;
  name: string;
  price: number;
  image: string;

  category?: ReturnCategoryDto;

  constructor(product: Product) {
    this.id = product.id;
    this.name = product.name;
    this.price = product.price;
    this.image = product.image;

    if (product.category) {
      this.category = new ReturnCategoryDto(product.category);
    }
  }
}
