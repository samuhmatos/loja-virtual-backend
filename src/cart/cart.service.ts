import { Injectable } from '@nestjs/common';
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

  async create(createCart: CreateCartDto): Promise<void> {}
}
