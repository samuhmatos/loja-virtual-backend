import { ReturnProductDto } from 'src/product/dto/returnProduct.dto';
import { CartProduct } from '../entities/cart-product.entity';
import { ReturnCartDto } from 'src/cart/dtos/returnCart.dto';

export class ReturnCardProductDto {
  id: number;
  cartId: number;
  productId: number;
  amount: number;

  product?: ReturnProductDto;
  cart?: ReturnCartDto;

  constructor(cartProduct: CartProduct) {
    this.id = cartProduct.id;
    this.cartId = cartProduct.cartId;
    this.productId = cartProduct.productId;
    this.amount = cartProduct.amount;

    if (cartProduct.product) {
      this.product = new ReturnProductDto(cartProduct.product);
    }

    if (cartProduct.cart) {
      this.cart = new ReturnCartDto(cartProduct.cart);
    }
  }
}
