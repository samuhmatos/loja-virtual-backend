import { Test, TestingModule } from '@nestjs/testing';
import {
  OrderProductRepository,
  OrderProductService,
} from '../order-product.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { OrderProduct } from '../entities/order-product.entity';

describe('OrderProductService', () => {
  let service: OrderProductService;
  let orderProductRepository: OrderProductRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderProductService,
        {
          provide: getRepositoryToken(OrderProduct),
          useValue: { save: jest.fn().mockResolvedValue(null) },
        },
      ],
    }).compile();

    service = module.get<OrderProductService>(OrderProductService);
    orderProductRepository = module.get<OrderProductRepository>(
      getRepositoryToken(OrderProduct),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(orderProductRepository).toBeDefined();
  });
});
