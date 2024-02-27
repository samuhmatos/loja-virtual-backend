import { getRepositoryToken } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';

import {
  CartProductRepository,
  CartProductService,
} from '../cart-product.service';
import { CartProduct } from '../entities/cart-product.entity';
import { ProductService } from '../../product/product.service';
import { productMock } from '../../product/__mocks__/product.mock';
import { ReturnDeleteMock } from '../../__mocks___/returnDelete.mock';
import { cartProductMock } from '../__mocks__/cart-product.mock';
import { createCartMock } from '../../cart/__mocks__/create-cart.mock';
import { cartMock } from '../../cart/__mocks__/cart.mock';
import { NotFoundException } from '@nestjs/common';
import { updateCartMock } from '../../cart/__mocks__/update-cart.mock';

describe('CartProductService', () => {
  let service: CartProductService;
  let cartProductRepository: CartProductRepository;
  let productService: ProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CartProductService,
        {
          provide: getRepositoryToken(CartProduct),
          useValue: {
            save: jest.fn().mockResolvedValue(cartProductMock),
            findOne: jest.fn().mockResolvedValue(cartProductMock),
            delete: jest.fn().mockResolvedValue(ReturnDeleteMock),
          },
        },
        {
          provide: ProductService,
          useValue: {
            findById: jest.fn().mockResolvedValue(productMock),
          },
        },
      ],
    }).compile();

    service = module.get<CartProductService>(CartProductService);
    productService = module.get<ProductService>(ProductService);
    cartProductRepository = module.get<CartProductRepository>(
      getRepositoryToken(CartProduct),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(cartProductRepository).toBeDefined();
    expect(productService).toBeDefined();
  });

  it('return delete result on delete', async () => {
    const deleteResult = await service.remove(
      cartProductMock.productId,
      cartProductMock.cartId,
    );

    expect(deleteResult).toEqual(ReturnDeleteMock);
  });

  it('return error in exception on delete', async () => {
    jest.spyOn(cartProductRepository, 'delete').mockRejectedValue(new Error());

    expect(
      service.remove(cartProductMock.productId, cartProductMock.cartId),
    ).rejects.toThrowError();
  });

  it('return cartProduct on create', async () => {
    const cartProduct = await service.create(createCartMock, cartMock.id);

    expect(cartProduct).toEqual(cartProductMock);
  });

  it('return error in exception on create', async () => {
    jest.spyOn(cartProductRepository, 'save').mockRejectedValue(new Error());

    expect(service.create(createCartMock, cartMock.id)).rejects.toThrowError();
  });

  it('return cartProduct if exist on verifyInCart', async () => {
    const cartProduct = await service.verifyInCart(productMock.id, cartMock.id);

    expect(cartProduct).toEqual(cartProductMock);
  });

  it('return error in exception on verifyInCart', async () => {
    jest.spyOn(cartProductRepository, 'findOne').mockRejectedValue(new Error());

    expect(
      service.verifyInCart(productMock.id, cartMock.id),
    ).rejects.toThrowError(Error);
  });

  it('return error in not exist cart on verifyInCart', async () => {
    jest.spyOn(cartProductRepository, 'findOne').mockResolvedValue(undefined);

    expect(
      service.verifyInCart(productMock.id, cartMock.id),
    ).rejects.toThrowError(NotFoundException);
  });

  it('return error in exception on insertInCart', async () => {
    jest
      .spyOn(productService, 'findById')
      .mockRejectedValue(new NotFoundException());

    expect(service.insertInCart(createCartMock, cartMock)).rejects.toThrowError(
      NotFoundException,
    );
  });

  it('return cartProduct if not exist a opened cart on insertInCart', async () => {
    const spy = jest.spyOn(cartProductRepository, 'save');
    jest.spyOn(cartProductRepository, 'findOne').mockResolvedValue(undefined);

    const cartProduct = await service.insertInCart(createCartMock, cartMock);

    expect(cartProduct).toEqual(cartProductMock);
    expect(spy.mock.calls[0][0].amount).toEqual(createCartMock.amount);
  });

  it('return cartProduct if not exist a opened cart on insertInCart', async () => {
    const spy = jest.spyOn(cartProductRepository, 'save');

    const cartProduct = await service.insertInCart(createCartMock, cartMock);

    expect(cartProduct).toEqual(cartProductMock);
    expect(spy.mock.calls[0][0]).toEqual({
      ...cartProductMock,
      amount: cartProductMock.amount + createCartMock.amount,
    });
  });

  //

  it('return error in exception on update', async () => {
    jest
      .spyOn(productService, 'findById')
      .mockRejectedValue(new NotFoundException());

    expect(service.update(updateCartMock, cartMock)).rejects.toThrowError(
      NotFoundException,
    );
  });

  it('return cartProduct if not exist a opened cart on update', async () => {
    jest.spyOn(cartProductRepository, 'findOne').mockResolvedValue(undefined);

    expect(service.update(updateCartMock, cartMock)).rejects.toThrowError(
      NotFoundException,
    );
  });

  it('return cartProduct if not exist a opened cart on update', async () => {
    const spy = jest.spyOn(cartProductRepository, 'save');

    const cartProduct = await service.update(updateCartMock, cartMock);

    expect(cartProduct).toEqual(cartProductMock);
    expect(spy.mock.calls[0][0].amount).toEqual(updateCartMock.amount);
  });
});
