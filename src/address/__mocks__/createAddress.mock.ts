import { cityMock } from '../../city/__mocks__/city.mock';
import { CreateAddressDto } from '../dtos/createAddress.dto';

export const createAddressMock: CreateAddressDto = {
  cep: '23423423',
  cityId: cityMock.id,
  complement: 'wewer',
  numberAddress: 123,
};
