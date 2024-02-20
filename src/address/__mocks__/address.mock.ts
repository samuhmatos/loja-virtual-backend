import { cityMock } from '../../city/__mocks__/city.mock';
import { Address } from '../entities/address.entity';
import { userMock } from '../../user/__mocks__/user.mock';

export const addressMock: Address = {
  createdAt: new Date(),
  updatedAt: new Date(),
  id: 121,
  cep: '3234',
  cityId: cityMock.id,
  complement: 'asdasd',
  numberAddress: 12,
  userId: userMock.id,
};
