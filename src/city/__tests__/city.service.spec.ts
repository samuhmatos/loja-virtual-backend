import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { cityMock } from '../__mocks__/city.mock';
import { CityRepository, CityService } from '../city.service';
import { City } from '../entities/city.entity';
import { CacheService } from '../../cache/cache.service';

describe('CityService', () => {
  let service: CityService;
  let CityRepository: CityRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CityService,
        {
          provide: CacheService,
          useValue: {
            get: jest.fn().mockResolvedValue([cityMock]),
          },
        },
        {
          provide: getRepositoryToken(City),
          useValue: {
            findOne: jest.fn().mockResolvedValue(cityMock),
          },
        },
      ],
    }).compile();

    service = module.get<CityService>(CityService);
    CityRepository = module.get<CityRepository>(getRepositoryToken(City));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(CityRepository).toBeDefined();
  });

  it('should return city in findById', async () => {
    const city = await service.findById(cityMock.id);

    expect(city).toEqual(cityMock);
  });

  it('should return error when not found in findById', async () => {
    jest.spyOn(CityRepository, 'findOne').mockResolvedValue(undefined);

    expect(service.findById(cityMock.id)).rejects.toThrowError();
  });

  it('should return cities in getAllCitiesByStateId', async () => {
    const cities = await service.getAllCitiesByStateId(cityMock.id);

    expect(cities).toEqual([cityMock]);
  });
});
