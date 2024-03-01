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

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('/cart/:cartId')
  @UsePipes(ValidationPipe)
  async create(
    @Body() createOrderDto: CreateOrderDto,
    @Param() cartId: number,
  ) {
    return this.orderService.create(createOrderDto, cartId);
  }
}
