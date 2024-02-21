import { Test, TestingModule } from '@nestjs/testing';
import { CategoryRepository, CategoryService } from '../category.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Category } from '../entities/category.entity';
import { categoryMock } from '../__mocks__/category.mock';
import { createCategoryMock } from '../__mocks__/createCategory.mock';

describe('CategoryService', () => {
  let service: CategoryService;
  let categoryRepository: CategoryRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoryService,
        {
          provide: getRepositoryToken(Category),
          useValue: {
            find: jest.fn().mockResolvedValue([categoryMock]),
            save: jest.fn().mockResolvedValue(categoryMock),
            findOne: jest.fn().mockResolvedValue(categoryMock),
          },
        },
      ],
    }).compile();

    service = module.get<CategoryService>(CategoryService);
    categoryRepository = module.get<CategoryRepository>(
      getRepositoryToken(Category),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(categoryRepository).toBeDefined();
  });

  it('should return category list', async () => {
    const categories = await service.findAll();

    expect(categories).toEqual([categoryMock]);
  });

  it('should return  error in list category empty', async () => {
    jest.spyOn(categoryRepository, 'find').mockResolvedValue([]);

    expect(service.findAll()).rejects.toThrowError();
  });

  it('should return  error in list category exception', async () => {
    jest.spyOn(categoryRepository, 'find').mockRejectedValue(new Error());

    expect(service.findAll()).rejects.toThrowError();
  });

  it('should return  error if already exist category name on save', async () => {
    expect(service.create(createCategoryMock)).rejects.toThrowError();
  });

  it('should return  category on save', async () => {
    jest.spyOn(categoryRepository, 'findOne').mockResolvedValue(undefined);

    const category = await service.create(createCategoryMock);

    expect(category).toEqual(categoryMock);
  });

  it('should return error in exception on save', async () => {
    jest.spyOn(categoryRepository, 'save').mockRejectedValue(new Error());

    expect(service.create(createCategoryMock)).rejects.toThrowError();
  });

  it('should return category on findByName', async () => {
    const category = await service.findByName(categoryMock.name);

    expect(category).toEqual(categoryMock);
  });

  it('should return error if category is not found on findByName', async () => {
    jest.spyOn(categoryRepository, 'findOne').mockResolvedValue(undefined);

    expect(service.findByName(categoryMock.name)).rejects.toThrowError();
  });

  it('should return category on findById', async () => {
    const category = await service.findById(categoryMock.id);

    expect(category).toEqual(categoryMock);
  });

  it('should return error if category is not found on findById', async () => {
    jest.spyOn(categoryRepository, 'findOne').mockResolvedValue(undefined);

    expect(service.findById(categoryMock.id)).rejects.toThrowError();
  });
});
