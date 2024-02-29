import { Test, TestingModule } from '@nestjs/testing';
import { CartRepository, CartService } from '../cart.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Cart } from '../entities/cart.entity';
import { CartProductService } from '../../cart-product/cart-product.service';
import { ReturnDeleteMock } from '../../__mocks___/returnDelete.mock';
import { cartMock } from '../__mocks__/cart.mock';
import { userMock } from '../../user/__mocks__/user.mock';
import { NotFoundException } from '@nestjs/common';
import { createCartMock } from '../__mocks__/create-cart.mock';
import { productMock } from '../../product/__mocks__/product.mock';
import { updateCartMock } from '../__mocks__/update-cart.mock';

describe('CartService', () => {
  let service: CartService;
  let cartRepository: CartRepository;
  let cartProductService: CartProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CartService,
        {
          provide: getRepositoryToken(Cart),
          useValue: {
            save: jest.fn().mockResolvedValue(cartMock),
            findOne: jest.fn().mockResolvedValue(cartMock),
          },
        },
        {
          provide: CartProductService,
          useValue: {
            update: jest.fn().mockResolvedValue(undefined),
            remove: jest.fn().mockResolvedValue(ReturnDeleteMock),
            insertInCart: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    service = module.get<CartService>(CartService);
    cartProductService = module.get<CartProductService>(CartProductService);
    cartRepository = module.get<CartRepository>(getRepositoryToken(Cart));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(cartRepository).toBeDefined();
    expect(cartProductService).toBeDefined();
  });

  it('should return delete result if delete cart on clear', async () => {
    const spy = jest.spyOn(cartRepository, 'save');

    const resultDelete = await service.clear(userMock.id);

    expect(resultDelete).toEqual(ReturnDeleteMock);
    expect(spy.mock.calls[0][0]).toEqual({
      ...cartMock,
      active: false,
    });
  });

  it('should return error in findByUserId if undefined on clear', async () => {
    jest.spyOn(cartRepository, 'findOne').mockResolvedValue(undefined);

    expect(service.clear(userMock.id)).rejects.toThrowError(NotFoundException);
  });

  it('should return cart with no relations in findByUserId', async () => {
    const spy = jest.spyOn(cartRepository, 'findOne');
    const cart = await service.findByUserId(userMock.id);

    expect(cart).toEqual(cartMock);
    expect(spy.mock.calls[0][0].relations).toEqual(undefined);
  });

  it('should return cart with relations in findByUserId', async () => {
    const spy = jest.spyOn(cartRepository, 'findOne');
    const cart = await service.findByUserId(userMock.id, true);

    expect(cart).toEqual(cartMock);
    expect(spy.mock.calls[0][0].relations).toEqual({
      cartProducts: {
        product: true,
      },
    });
  });

  it('should return error notFoundException if not found cart  on findByUserId', async () => {
    jest.spyOn(cartRepository, 'findOne').mockResolvedValue(undefined);

    expect(service.findByUserId(userMock.id)).rejects.toThrowError(
      NotFoundException,
    );
  });

  it('should return cart on create', async () => {
    const spy = jest.spyOn(cartRepository, 'save');
    const cart = await service.create(userMock.id);

    expect(cart).toEqual(cartMock);
    expect(spy.mock.calls[0][0]).toEqual({ active: true, userId: userMock.id });
  });

  it('should return cart in cart not found on insertProductInCart', async () => {
    jest.spyOn(cartRepository, 'findOne').mockResolvedValue(undefined);
    const spy = jest.spyOn(cartRepository, 'save');
    const spyCartProductService = jest.spyOn(
      cartProductService,
      'insertInCart',
    );

    const cart = await service.insertProductInCart(createCartMock, userMock.id);

    expect(cart).toEqual(cartMock);
    expect(spy.mock.calls.length).toEqual(1);
    expect(spyCartProductService.mock.calls.length).toEqual(1);
  });

  it('should return cart in cart found on insertProductInCart', async () => {
    const spy = jest.spyOn(cartRepository, 'save');
    const spyCartProductService = jest.spyOn(
      cartProductService,
      'insertInCart',
    );

    const cart = await service.insertProductInCart(createCartMock, userMock.id);

    expect(cart).toEqual(cartMock);
    expect(spy.mock.calls.length).toEqual(0);
    expect(spyCartProductService.mock.calls.length).toEqual(1);
  });

  it('should return delete result in removeProduct', async () => {
    const spy = jest.spyOn(cartProductService, 'remove');

    const deleteResult = await service.removeProduct(
      productMock.id,
      userMock.id,
    );

    expect(deleteResult).toEqual(ReturnDeleteMock);
    expect(spy.mock.calls.length).toEqual(1);
  });

  it('should return error NotFoundException in removeProduct', async () => {
    jest.spyOn(cartRepository, 'findOne').mockResolvedValue(undefined);
    const spy = jest.spyOn(cartProductService, 'remove');

    expect(
      service.removeProduct(productMock.id, userMock.id),
    ).rejects.toThrowError(NotFoundException);
    expect(spy.mock.calls.length).toEqual(0);
  });

  it('should cart updateProduct', async () => {
    const spyCartProductService = jest.spyOn(cartProductService, 'update');
    const spy = jest.spyOn(cartRepository, 'save');

    const cart = await service.updateProduct(updateCartMock, userMock.id);

    expect(spyCartProductService.mock.calls.length).toEqual(1);
    expect(spy.mock.calls.length).toEqual(0);
    expect(cart).toEqual(cartMock);
  });

  it('should cart updateProduct and create in update', async () => {
    jest.spyOn(cartRepository, 'findOne').mockResolvedValue(undefined);

    const spyCartProductService = jest.spyOn(cartProductService, 'update');
    const spy = jest.spyOn(cartRepository, 'save');

    const cart = await service.updateProduct(updateCartMock, userMock.id);

    expect(spyCartProductService.mock.calls.length).toEqual(1);
    expect(spy.mock.calls.length).toEqual(1);
    expect(cart).toEqual(cartMock);
  });
});
