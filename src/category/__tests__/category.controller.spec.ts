import { Test, TestingModule } from '@nestjs/testing';
import { CategoryController } from '../category.controller';
import { CategoryService } from '../category.service';
import { categoryMock } from '../__mocks__/category.mock';
import { returnCategoryMock } from '../__mocks__/returnCategory.mock';
import { createCategoryMock } from '../__mocks__/createCategory.mock';

describe('CategoryController', () => {
  let controller: CategoryController;
  let categoryService: CategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoryController],
      providers: [
        {
          provide: CategoryService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([categoryMock]),
            create: jest.fn().mockResolvedValue(categoryMock),
          },
        },
      ],
    }).compile();

    controller = module.get<CategoryController>(CategoryController);
    categoryService = module.get<CategoryService>(CategoryService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(categoryService).toBeDefined();
  });

  it('should return ReturnCategoryDto[] in findAll', async () => {
    const categories = await controller.findAll();

    expect(categories).toEqual([returnCategoryMock]);
  });

  it('should return ReturnCategoryDto in create', async () => {
    const category = await controller.create(createCategoryMock);

    expect(category).toEqual(categoryMock);
  });
});
