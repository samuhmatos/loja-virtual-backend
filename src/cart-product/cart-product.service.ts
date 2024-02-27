import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CartProduct } from './entities/cart-product.entity';
import { CreateCartDto } from 'src/cart/dtos/createCart.dto';
import { Cart } from 'src/cart/entities/cart.entity';
import { ProductService } from '../product/product.service';

export type CartProductRepository = Repository<CartProduct>;

@Injectable()
export class CartProductService {
  constructor(
    @InjectRepository(CartProduct)
    private readonly cartProductRepository: CartProductRepository,

    private readonly productService: ProductService,
  ) {}

  async verifyInCart(productId: number, cartId: number): Promise<CartProduct> {
    const cartProduct = await this.cartProductRepository.findOne({
      where: { cartId, productId },
    });

    if (!cartProduct) {
      throw new NotFoundException('Not found product in cart');
    }

    return cartProduct;
  }

  async create(
    createCart: CreateCartDto,
    cartId: number,
  ): Promise<CartProduct> {
    return this.cartProductRepository.save({
      productId: createCart.productId,
      cartId,
      amount: createCart.amount,
    });
  }

  async insertInCart(
    createCart: CreateCartDto,
    cart: Cart,
  ): Promise<CartProduct> {
    await this.productService.findById(createCart.productId);

    const cartProduct = await this.verifyInCart(
      createCart.productId,
      cart.id,
    ).catch(() => undefined);

    if (!cartProduct) {
      return this.create(createCart, cart.id);
    }

    return this.cartProductRepository.save({
      ...cartProduct,
      amount: cartProduct.amount + createCart.amount,
    });
  }
}
