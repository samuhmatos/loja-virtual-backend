import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Cart } from './entities/cart.entity';
import { CreateCartDto } from './dtos/createCart.dto';

export type CartRepository = Repository<Cart>;

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private readonly cartRepository: CartRepository,
  ) {}

  async create(userId: number): Promise<Cart> {
    return this.cartRepository.save({ active: true, userId });
  }

  async insertProductInCart(
    createCart: CreateCartDto,
    userId: number,
  ): Promise<Cart> {
    const cart = await this.verifyActiveCart(userId).catch(async () => {
      return this.create(userId);
    });

    return cart;
  }

  async verifyActiveCart(userId: number): Promise<Cart> {
    const cart = await this.cartRepository.findOne({ where: { userId } });

    if (!cart) {
      throw new NotFoundException(`Cart active not found`);
    }

    return cart;
  }
}
