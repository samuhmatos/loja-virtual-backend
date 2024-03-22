import { Test, TestingModule } from '@nestjs/testing';
import { OrderRepository, OrderService } from '../order.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Order } from '../entities/order.entity';
import { OrderProductService } from '../../order-product/order-product.service';
import { ProductService } from '../../product/product.service';
import { AddressService } from '../../address/address.service';
import { CartService } from '../../cart/cart.service';
import { PaymentService } from '../../payment/payment.service';
import { cartMock } from '../../cart/__mocks__/cart.mock';
import { productMock } from '../../product/__mocks__/product.mock';
import { addressMock } from '../../address/__mocks__/address.mock';
import { orderMock } from '../mocks/order.mock';
import { userMock } from '../../user/__mocks__/user.mock';
import { NotFoundException } from '@nestjs/common';
import { orderProductMock } from '../../order-product/mocks/order-product.mock';
import { cartProductMock } from '../../cart-product/__mocks__/cart-product.mock';
import { paymentMock } from '../../payment/mocks/payment.mock';
import { createOrderPixMock } from '../mocks/create-order.mock';
import { Cart } from '../../cart/entities/cart.entity';

jest.useFakeTimers().setSystemTime(new Date('2024-03-22'));

const cartRelationsMock: Cart = {
  ...cartMock,
  cartProducts: [cartProductMock],
};

describe('OrderService', () => {
  let service: OrderService;
  let orderRepository: OrderRepository;
  let cartService: CartService;
  let orderProductService: OrderProductService;
  let productService: ProductService;
  let addressService: AddressService;
  let paymentService: PaymentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderService,
        {
          provide: getRepositoryToken(Order),
          useValue: {
            find: jest.fn().mockResolvedValue([orderMock]),
            save: jest.fn().mockResolvedValue(orderMock),
          },
        },

        {
          provide: CartService,
          useValue: {
            findByUserId: jest.fn().mockResolvedValue(cartRelationsMock),
            clear: jest.fn().mockResolvedValue(undefined),
          },
        },
        {
          provide: OrderProductService,
          useValue: {
            create: jest.fn().mockResolvedValue(orderProductMock),
          },
        },
        {
          provide: ProductService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([productMock]),
          },
        },
        {
          provide: AddressService,
          useValue: {
            findByIdAndUserId: jest.fn().mockResolvedValue(addressMock),
          },
        },
        {
          provide: PaymentService,
          useValue: {
            create: jest.fn().mockResolvedValue(paymentMock),
          },
        },
      ],
    }).compile();

    service = module.get<OrderService>(OrderService);
    orderRepository = module.get<OrderRepository>(getRepositoryToken(Order));
    paymentService = module.get<PaymentService>(PaymentService);
    cartService = module.get<CartService>(CartService);
    orderProductService = module.get<OrderProductService>(OrderProductService);
    productService = module.get<ProductService>(ProductService);
    addressService = module.get<AddressService>(AddressService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(orderRepository).toBeDefined();
    expect(cartService).toBeDefined();
    expect(orderProductService).toBeDefined();
    expect(productService).toBeDefined();
    expect(addressService).toBeDefined();
    expect(paymentService).toBeDefined();
  });

  it('should return Orders in findAllByUSerId', async () => {
    const spy = jest.spyOn(orderRepository, 'find');
    const orders = await service.findAllByUSerId(userMock.id);

    expect(orders).toEqual([orderMock]);
    expect(spy.mock.calls[0][0]).toEqual({
      where: { userId: userMock.id },
      relations: {
        address: true,
        ordersProduct: { product: true },
        payment: { paymentStatus: true },
      },
    });
  });

  it('should return NotFoundExeception if order empty findAllByUSerId', async () => {
    jest.spyOn(orderRepository, 'find').mockResolvedValue([]);

    expect(service.findAllByUSerId(userMock.id)).rejects.toThrowError(
      NotFoundException,
    );
  });

  it('should call create (orderProductService) on createOrderProductUsingCart', async () => {
    const spyOrderProduct = jest.spyOn(orderProductService, 'create');

    const createOrderProductUsingCart =
      await service.createOrderProductUsingCart(
        {
          ...cartMock,
          cartProducts: [cartProductMock, cartProductMock],
        },
        orderMock.id,
        [productMock],
      );

    expect(createOrderProductUsingCart).toEqual([
      orderProductMock,
      orderProductMock,
    ]);
    expect(spyOrderProduct.mock.calls.length).toEqual(2);
  });

  it('should return order on createOrder', async () => {
    const spy = jest.spyOn(orderRepository, 'save');

    const order = await service.createOrder(
      createOrderPixMock.addressId,
      paymentMock.id,
      userMock.id,
    );

    expect(order).toEqual(orderMock);
    expect(spy.mock.calls[0][0]).toEqual({
      addressId: createOrderPixMock.addressId,
      date: new Date(),
      paymentId: paymentMock.id,
      userId: userMock.id,
    });
  });

  it('should return exception in error on createOrder', async () => {
    jest.spyOn(orderRepository, 'save').mockRejectedValue(new Error());

    expect(
      service.createOrder(
        createOrderPixMock.addressId,
        paymentMock.id,
        userMock.id,
      ),
    ).rejects.toThrow();
  });

  it('should return order on create success', async () => {
    const spyCartServiceFindByUserId = jest.spyOn(cartService, 'findByUserId');
    const spyProductService = jest.spyOn(productService, 'findAll');
    const spyAddressService = jest.spyOn(addressService, 'findByIdAndUserId');
    const spySave = jest.spyOn(orderRepository, 'save');
    const spyOrderProductService = jest.spyOn(orderProductService, 'create');
    const spyCartServiceClear = jest.spyOn(cartService, 'clear');

    const order = await service.create(createOrderPixMock, userMock.id);

    expect(order).toEqual(orderMock);
    expect(spyCartServiceFindByUserId.mock.calls.length).toEqual(1);
    expect(spyProductService.mock.calls.length).toEqual(1);
    expect(spyAddressService.mock.calls.length).toEqual(1);
    expect(spySave.mock.calls.length).toEqual(1);
    expect(spyOrderProductService.mock.calls.length).toEqual(1);
    expect(spyCartServiceClear.mock.calls.length).toEqual(1);
  });
});
