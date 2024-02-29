import { Test, TestingModule } from '@nestjs/testing';
import { AddressController } from '../address.controller';
import { AddressService } from '../address.service';
import { createAddressMock } from '../__mocks__/createAddress.mock';
import { userMock } from '../../user/__mocks__/user.mock';
import { addressMock } from '../__mocks__/address.mock';

describe('AddressController', () => {
  let controller: AddressController;
  let addressService: AddressService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AddressController],
      providers: [
        {
          provide: AddressService,
          useValue: {
            create: jest.fn().mockResolvedValue(addressMock),
            findAllByUserId: jest.fn().mockResolvedValue([addressMock]),
          },
        },
      ],
    }).compile();

    controller = module.get<AddressController>(AddressController);
    addressService = module.get<AddressService>(AddressService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(addressService).toBeDefined();
  });

  it('should return Address in create', async () => {
    const address = await controller.create(createAddressMock, userMock.id);

    expect(address).toEqual(addressMock);
  });

  it('should return all Addresses in findAllByUserId', async () => {
    const addresses = await controller.findAllByUserId(userMock.id);

    expect(addresses).toEqual([
      {
        complement: addressMock.complement,
        numberAddress: addressMock.numberAddress,
        cep: addressMock.cep,
      },
    ]);
  });
});
