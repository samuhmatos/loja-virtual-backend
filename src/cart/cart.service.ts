import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Cart } from './entities/cart.entity';
import { CreateCartDto } from './dtos/createCart.dto';
import { CartProductService } from '../cart-product/cart-product.service';

export type CartRepository = Repository<Cart>;

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private readonly cartRepository: CartRepository,

    private readonly cartProductService: CartProductService,
  ) {}

  async findById(userId: number, isRelations?: boolean): Promise<Cart> {
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
      throw new NotFoundException(`Cart active not found`);
    }

    return cart;
  }

  async create(userId: number): Promise<Cart> {
    return this.cartRepository.save({ active: true, userId });
  }

  async insertProductInCart(
    createCart: CreateCartDto,
    userId: number,
  ): Promise<Cart> {
    const cart = await this.findById(userId).catch(async () => {
      return this.create(userId);
    });

    await this.cartProductService.insertInCart(createCart, cart);

    return this.findById(userId, true);
  }
}
