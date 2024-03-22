import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from '../order.controller';
import { OrderService } from '../order.service';
import { orderMock } from '../mocks/order.mock';
import { createOrderPixMock } from '../mocks/create-order.mock';
import { userMock } from '../../user/__mocks__/user.mock';

describe('OrderController', () => {
  let controller: OrderController;
  let orderService: OrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [
        {
          provide: OrderService,
          useValue: {
            create: jest.fn().mockResolvedValue(orderMock),
            findAllByUSerId: jest.fn().mockResolvedValue([orderMock]),
          },
        },
      ],
    }).compile();

    controller = module.get<OrderController>(OrderController);
    orderService = module.get<OrderService>(OrderService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(orderService).toBeDefined();
  });

  it('should return order on create', async () => {
    const order = await controller.create(createOrderPixMock, userMock.id);

    expect(order).toEqual(orderMock);
  });

  it('should return order list on findAllByUserId', async () => {
    const orders = await controller.findAllByUserId(userMock.id);

    expect(orders).toEqual([orderMock]);
  });
});
