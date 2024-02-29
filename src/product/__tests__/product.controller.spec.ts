import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from '../product.controller';
import { ProductService } from '../product.service';
import { productMock } from '../__mocks__/product.mock';
import { ReturnDeleteMock } from '../../__mocks___/returnDelete.mock';
import { createProductMock } from '../__mocks__/createProduct.mock';
import { updateProductMock } from '../__mocks__/updateProduct.mock';

describe('ProductController', () => {
  let controller: ProductController;
  let productService: ProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [
        {
          provide: ProductService,
          useValue: {
            create: jest.fn().mockResolvedValue(productMock),
            findAll: jest.fn().mockResolvedValue([productMock]),
            remove: jest.fn().mockResolvedValue(ReturnDeleteMock),
            update: jest.fn().mockResolvedValue(productMock),
          },
        },
      ],
    }).compile();

    controller = module.get<ProductController>(ProductController);
    productService = module.get<ProductService>(ProductService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(productService).toBeDefined();
  });

  it('should return Product in create', async () => {
    const product = await controller.create(createProductMock);

    expect(product).toEqual(productMock);
  });

  it('should return Product[] in findAll', async () => {
    const products = await controller.findAll();

    expect(products).toEqual([
      {
        id: productMock.id,
        name: productMock.name,
        price: productMock.price,
        image: productMock.image,
      },
    ]);
  });

  it('should return DeleteResult in destroy', async () => {
    const deleteResult = await controller.destroy(productMock.id);

    expect(deleteResult).toEqual(ReturnDeleteMock);
  });

  it('should return Product in update', async () => {
    const product = await controller.update(productMock.id, updateProductMock);

    expect(product).toEqual(productMock);
  });
});
