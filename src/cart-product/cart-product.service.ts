import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CartProduct } from './entities/cart-product.entity';
import { CreateCartDto } from '../cart/dtos/createCart.dto';
import { Cart } from '../cart/entities/cart.entity';
import { ProductService } from '../product/product.service';
import { UpdateCartDto } from '../cart/dtos/update-cart.dto';

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

    return this.updateAmount(
      cartProduct,
      cartProduct.amount + createCart.amount,
    );
  }

  async remove(productId: number, cartId: number): Promise<DeleteResult> {
    return this.cartProductRepository.delete({ productId, cartId });
  }

  private async updateAmount(
    cartProduct: CartProduct,
    amount: number,
  ): Promise<CartProduct> {
    return this.cartProductRepository.save({
      ...cartProduct,
      amount: amount,
    });
  }

  async update(updateCartDto: UpdateCartDto, cart: Cart): Promise<CartProduct> {
    await this.productService.findById(updateCartDto.productId);

    const cartProduct = await this.verifyInCart(
      updateCartDto.productId,
      cart.id,
    );

    return this.updateAmount(cartProduct, updateCartDto.amount);
  }
}
