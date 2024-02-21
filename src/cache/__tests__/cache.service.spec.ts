import { Test, TestingModule } from '@nestjs/testing';
import { CacheService } from '../cache.service';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { userMock } from '../../user/__mocks__/user.mock';

describe('CacheService', () => {
  let service: CacheService;
  let cacheManager: Cache;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CacheService,
        {
          provide: CACHE_MANAGER,
          useValue: {
            get: () => userMock,
            set: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<CacheService>(CacheService);
    cacheManager = module.get(CACHE_MANAGER);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return data in cache', async () => {
    const user = await service.get('key', () => null);

    expect(user).toEqual(userMock);
  });

  it('should return data in function', async () => {
    const result = { test: 'test' };
    jest.spyOn(cacheManager, 'get').mockReturnValue(undefined);

    const user = await service.get('key', async () => result);

    expect(user).toEqual(result);
  });
});
