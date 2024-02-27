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
import { UserId } from '../decorators/user-id.decorator';
import { ReturnCartDto } from './dtos/returnCart.dto';

@Roles(UserType.User, UserType.Admin)
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @UsePipes(ValidationPipe)
  @Post()
  async create(
    @Body() createCartDto: CreateCartDto,
    @UserId() userId: number,
  ): Promise<ReturnCartDto> {
    const cart = await this.cartService.insertProductInCart(
      createCartDto,
      userId,
    );

    return new ReturnCartDto(cart);
  }
}
