import { Test, TestingModule } from '@nestjs/testing';
import { OrderRepository, OrderService } from '../order.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Order } from '../entities/order.entity';

describe('OrderService', () => {
  let service: OrderService;
  let orderRepository: OrderRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderService,
        {
          provide: getRepositoryToken(Order),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<OrderService>(OrderService);
    orderRepository = module.get<OrderRepository>(getRepositoryToken(Order));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(orderRepository).toBeDefined();
  });
});
