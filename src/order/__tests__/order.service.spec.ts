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
          useValue: {},
        },

        {
          provide: CartService,
          useValue: {
            findByUserId: jest.fn().mockResolvedValue(cartMock),
            clear: jest.fn().mockResolvedValue(undefined),
          },
        },
        {
          provide: OrderProductService,
          useValue: {
            create: jest.fn().mockResolvedValue(null),
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
            create: jest.fn().mockResolvedValue(null),
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
});
