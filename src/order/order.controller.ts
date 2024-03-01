import {
  Body,
  Controller,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dtos/create-order.dto';
import { UserId } from 'src/decorators/user-id.decorator';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('/cart/:cartId')
  @UsePipes(ValidationPipe)
  async create(
    @Body() createOrderDto: CreateOrderDto,
    @Param() cartId: number,
    @UserId() userId: number,
  ) {
    return this.orderService.create(createOrderDto, cartId, userId);
  }
}
