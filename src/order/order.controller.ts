import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dtos/create-order.dto';
import { UserId } from '../decorators/user-id.decorator';
import { Order } from './entities/order.entity';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async create(
    @Body() createOrderDto: CreateOrderDto,
    @UserId() userId: number,
  ): Promise<Order> {
    return this.orderService.create(createOrderDto, userId);
  }

  @Get()
  async findAllByUserId(@UserId() userId: number): Promise<Order[]> {
    return this.orderService.findAllByUSerId(userId);
  }
}
