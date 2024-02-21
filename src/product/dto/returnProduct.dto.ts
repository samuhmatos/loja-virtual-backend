import { Product } from '../entities/product.entity';

export class ReturnProductDto {
  id: number;
  name: string;
  price: number;
  image: string;

  constructor(product: Product) {
    this.id = product.id;
    this.name = product.name;
    this.price = product.price;
    this.image = product.image;
  }
}
