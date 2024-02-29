import { Test, TestingModule } from '@nestjs/testing';
import { CartController } from '../cart.controller';
import { CartService } from '../cart.service';
import { createCartMock } from '../__mocks__/create-cart.mock';
import { userMock } from '../../user/__mocks__/user.mock';
import { returnCartMock } from '../__mocks__/return-cart.mock';
import { cartMock } from '../__mocks__/cart.mock';
import { ReturnDeleteMock } from '../../__mocks___/returnDelete.mock';
import { productMock } from '../../product/__mocks__/product.mock';
import { updateCartMock } from '../__mocks__/update-cart.mock';

describe('CartController', () => {
  let controller: CartController;
  let cartService: CartService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CartController],
      providers: [
        {
          provide: CartService,
          useValue: {
            insertProductInCart: jest.fn().mockResolvedValue(cartMock),
            findByUserId: jest.fn().mockResolvedValue(cartMock),
            clear: jest.fn().mockResolvedValue(ReturnDeleteMock),
            removeProduct: jest.fn().mockResolvedValue(ReturnDeleteMock),
            updateProduct: jest.fn().mockResolvedValue(cartMock),
          },
        },
      ],
    }).compile();

    controller = module.get<CartController>(CartController);
    cartService = module.get<CartService>(CartService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(cartService).toBeDefined();
  });

  it('should return ReturnCartDto in create', async () => {
    const cart = await controller.create(createCartMock, userMock.id);

    expect(cart).toEqual(returnCartMock);
  });

  it('should return ReturnCartDto in findByUserId', async () => {
    const cart = await controller.findByUserId(userMock.id);

    expect(cart).toEqual(returnCartMock);
  });

  it('should return DeleteResult in clear', async () => {
    const deleteResult = await controller.clear(userMock.id);

    expect(deleteResult).toEqual(ReturnDeleteMock);
  });

  it('should return ReturnCartDto in removeProduct', async () => {
    const cart = await controller.removeProduct(productMock.id, userMock.id);

    expect(cart).toEqual(ReturnDeleteMock);
  });

  it('should return ReturnCartDto in updateProduct', async () => {
    const cart = await controller.updateProduct(updateCartMock, userMock.id);

    expect(cart).toEqual(returnCartMock);
  });
});
