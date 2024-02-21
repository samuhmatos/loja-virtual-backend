import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AddressRepository, AddressService } from '../address.service';
import { Address } from '../entities/address.entity';
import { UserService } from '../../user/user.service';
import { userMock } from '../../user/__mocks__/user.mock';
import { addressMock } from '../__mocks__/address.mock';
import { CityService } from '../../city/city.service';
import { cityMock } from '../../city/__mocks__/city.mock';
import { createAddressMock } from '../__mocks__/createAddress.mock';

describe('AddressService', () => {
  let service: AddressService;
  let addressRepository: AddressRepository;
  let userService: UserService;
  let cityService: CityService;

  const create = () => service.create(createAddressMock, userMock.id);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AddressService,
        {
          provide: UserService,
          useValue: {
            findById: jest.fn().mockResolvedValue(userMock),
          },
        },
        {
          provide: CityService,
          useValue: {
            findById: jest.fn().mockResolvedValue(cityMock),
          },
        },
        {
          provide: getRepositoryToken(Address),
          useValue: {
            save: jest.fn().mockResolvedValue(addressMock),
            find: jest.fn().mockResolvedValue([addressMock]),
          },
        },
      ],
    }).compile();

    service = module.get<AddressService>(AddressService);
    userService = module.get<UserService>(UserService);
    cityService = module.get<CityService>(CityService);

    addressRepository = module.get<AddressRepository>(
      getRepositoryToken(Address),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(userService).toBeDefined();
    expect(cityService).toBeDefined();
    expect(addressRepository).toBeDefined();
  });

  it('should return address in create', async () => {
    const address = await create();

    expect(address).toEqual(addressMock);
  });

  it('should return error if exception userService in create', async () => {
    jest.spyOn(userService, 'findById').mockRejectedValueOnce(new Error());

    expect(create()).rejects.toThrowError();
  });

  it('should return error if exception cityService in create', async () => {
    jest.spyOn(cityService, 'findById').mockRejectedValueOnce(new Error());

    expect(create()).rejects.toThrowError();
  });

  it('should return all address of user', async () => {
    const addresses = await service.findAllByUserId(userMock.id);

    expect(addresses).toEqual([addressMock]);
  });

  it('should return not found addresses if none is registered', async () => {
    jest.spyOn(addressRepository, 'find').mockResolvedValue(undefined);

    expect(service.findAllByUserId(userMock.id)).rejects.toThrowError();
  });
});
