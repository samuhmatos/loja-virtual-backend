import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';

import { Cart } from './entities/cart.entity';
import { CreateCartDto } from './dtos/createCart.dto';
import { CartProductService } from '../cart-product/cart-product.service';
import { UpdateCartDto } from './dtos/update-cart.dto';

export type CartRepository = Repository<Cart>;

const AFFECTED_LINE = 1;
@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private readonly cartRepository: CartRepository,

    private readonly cartProductService: CartProductService,
  ) {}

  async findByUserId(userId: number, isRelations?: boolean): Promise<Cart> {
    const relations = isRelations
      ? {
          cartProducts: {
            product: true,
          },
        }
      : undefined;

    const cart = await this.cartRepository.findOne({
      where: { userId, active: true },
      relations,
    });

    if (!cart) {
      throw new NotFoundException(`Active Cart not found`);
    }

    return cart;
  }

  async create(userId: number): Promise<Cart> {
    return this.cartRepository.save({ active: true, userId });
  }

  async clear(userId: number): Promise<DeleteResult> {
    const cart = await this.findByUserId(userId);

    await this.cartRepository.save({
      ...cart,
      active: false,
    });

    return {
      affected: AFFECTED_LINE,
      raw: [],
    };
  }

  async insertProductInCart(
    createCart: CreateCartDto,
    userId: number,
  ): Promise<Cart> {
    const cart = await this.findByUserId(userId).catch(async () => {
      return this.create(userId);
    });

    await this.cartProductService.insertInCart(createCart, cart);

    return cart;
  }

  async removeProduct(
    productId: number,
    userId: number,
  ): Promise<DeleteResult> {
    const cart = await this.findByUserId(userId);

    return this.cartProductService.remove(productId, cart.id);
  }

  async updateProduct(
    updateCartDto: UpdateCartDto,
    userId: number,
  ): Promise<Cart> {
    const cart = await this.findByUserId(userId);

    await this.cartProductService.update(updateCartDto, cart);

    return cart;
  }
}
