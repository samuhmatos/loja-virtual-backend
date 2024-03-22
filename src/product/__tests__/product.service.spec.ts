import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ProductRepository, ProductService } from '../product.service';
import { Product } from '../entities/product.entity';
import { productMock } from '../__mocks__/product.mock';
import { createProductMock } from '../__mocks__/createProduct.mock';
import { CategoryService } from '../../category/category.service';
import { categoryMock } from '../../category/__mocks__/category.mock';
import { ReturnDeleteMock } from '../../__mocks___/returnDelete.mock';
import { updateProductMock } from '../__mocks__/updateProduct.mock';
import { In } from 'typeorm';

describe('ProductService', () => {
  let service: ProductService;
  let productRepository: ProductRepository;
  let categoryService: CategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: getRepositoryToken(Product),
          useValue: {
            find: jest.fn().mockResolvedValue([productMock]),
            save: jest.fn().mockResolvedValue(productMock),
            findOne: jest.fn().mockResolvedValue(productMock),
            delete: jest.fn().mockResolvedValue(ReturnDeleteMock),
          },
        },
        {
          provide: CategoryService,
          useValue: {
            findById: jest.fn().mockResolvedValue(categoryMock),
          },
        },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
    categoryService = module.get<CategoryService>(CategoryService);

    productRepository = module.get<ProductRepository>(
      getRepositoryToken(Product),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(productRepository).toBeDefined();
  });

  it('should return product list', async () => {
    const products = await service.findAll();

    expect(products).toEqual([productMock]);
  });

  it('should return product list with relations in findAll', async () => {
    const spy = jest.spyOn(productRepository, 'find');
    const products = await service.findAll([], true);

    expect(products).toEqual([productMock]);
    expect(spy.mock.calls[0][0]).toEqual({
      relations: {
        category: true,
      },
    });
  });

  it('should return product list with relations and array in findAll', async () => {
    const spy = jest.spyOn(productRepository, 'find');
    const products = await service.findAll([2], true);

    expect(products).toEqual([productMock]);
    expect(spy.mock.calls[0][0]).toEqual({
      where: {
        id: In([2]),
      },
      relations: {
        category: true,
      },
    });
  });

  it('should return error if product list is empty', async () => {
    jest.spyOn(productRepository, 'find').mockResolvedValue([]);

    expect(service.findAll()).rejects.toThrowError();
  });

  it('should return error iin exception on findAll', async () => {
    jest.spyOn(productRepository, 'find').mockRejectedValue(new Error());

    expect(service.findAll()).rejects.toThrowError();
  });

  it('should return product on save', async () => {
    const products = await service.create(createProductMock);

    expect(products).toEqual(productMock);
  });

  it('should return error if product category not exist on save', async () => {
    jest.spyOn(categoryService, 'findById').mockRejectedValue(new Error());

    expect(service.create(createProductMock)).rejects.toThrowError();
  });

  it('should return product on findById', async () => {
    const products = await service.findById(productMock.id);

    expect(products).toEqual(productMock);
  });

  it('should return error if product not exist on findById', async () => {
    jest.spyOn(productRepository, 'findOne').mockResolvedValue(undefined);

    expect(service.findById(productMock.id)).rejects.toThrowError();
  });

  it('should return deleted true in delete product', async () => {
    const deleted = await service.remove(productMock.id);

    expect(deleted).toEqual(ReturnDeleteMock);
  });

  it('should return product on update', async () => {
    const product = await service.update(updateProductMock, productMock.id);

    expect(product).toEqual(productMock);
  });

  it('should return error on update', async () => {
    jest.spyOn(productRepository, 'save').mockRejectedValue(new Error());

    expect(
      service.update(updateProductMock, productMock.id),
    ).rejects.toThrowError();
  });
});
