import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ProductRepository, ProductService } from '../product.service';
import { Product } from '../entities/product.entity';
import { productMock } from '../__mocks__/product.mock';
import { createProductMock } from '../__mocks__/createProduct.mock';
import { CategoryService } from '../../category/category.service';
import { categoryMock } from '../../category/__mocks__/category.mock';

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

  it('should return error if product list is empty', async () => {
    jest.spyOn(productRepository, 'find').mockResolvedValue([]);

    expect(service.findAll()).rejects.toThrowError();
  });

  it('should return error if product list is empty', async () => {
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
});
