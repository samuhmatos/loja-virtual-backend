import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Roles } from '../decorators/roles.decorator';
import { UserType } from '../user/enum/user-type.enum';
import { CartService } from './cart.service';
import { CreateCartDto } from './dtos/createCart.dto';
import { Cart } from './entities/cart.entity';
import { UserId } from 'src/decorators/user-id.decorator';

@Roles(UserType.User, UserType.Admin)
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @UsePipes(ValidationPipe)
  @Post()
  async create(
    @Body() createCartDto: CreateCartDto,
    @UserId() userId: number,
  ): Promise<Cart> {
    return this.cartService.insertProductInCart(createCartDto, userId);
  }
}
