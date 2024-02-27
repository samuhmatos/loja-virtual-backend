import { ReturnCardProductDto } from '../../cart-product/dtos/returnCartProduct.dto';
import { Cart } from '../entities/cart.entity';

export class ReturnCartDto {
  id: number;

  cartProducts?: ReturnCardProductDto[];

  constructor(cart: Cart) {
    this.id = cart.id;

    if (cart.cartProducts) {
      this.cartProducts = cart.cartProducts.map(
        (cartProduct) => new ReturnCardProductDto(cartProduct),
      );
    }
  }
}
