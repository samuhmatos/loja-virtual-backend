import { Test, TestingModule } from '@nestjs/testing';
import {
  OrderProductRepository,
  OrderProductService,
} from '../order-product.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { OrderProduct } from '../entities/order-product.entity';
import { orderProductMock } from '../mocks/order-product.mock';
import { productMock } from '../../product/__mocks__/product.mock';
import { orderMock } from '../../order/mocks/order.mock';

describe('OrderProductService', () => {
  let service: OrderProductService;
  let orderProductRepository: OrderProductRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderProductService,
        {
          provide: getRepositoryToken(OrderProduct),
          useValue: { save: jest.fn().mockResolvedValue(orderProductMock) },
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

  it('should return OrderProduct on create', async () => {
    const spy = jest.spyOn(orderProductRepository, 'save');

    const orderProduct = await service.create(
      productMock.id,
      orderMock.id,
      orderProductMock.price,
      orderProductMock.amount,
    );

    expect(orderProduct).toEqual(orderProductMock);
    expect(spy.mock.calls[0][0].price).toEqual(orderProductMock.price);
    expect(spy.mock.calls[0][0].amount).toEqual(orderProductMock.amount);
    expect(spy.mock.calls[0][0].orderId).toEqual(orderMock.id);
    expect(spy.mock.calls[0][0].productId).toEqual(productMock.id);
  });

  it('should return exception db error on create', async () => {
    jest.spyOn(orderProductRepository, 'save').mockRejectedValue(new Error());

    expect(
      service.create(
        productMock.id,
        orderMock.id,
        orderProductMock.price,
        orderProductMock.amount,
      ),
    ).rejects.toThrowError();
  });
});
