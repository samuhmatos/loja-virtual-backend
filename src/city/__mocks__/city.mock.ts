import { stateMock } from '../../state/__mocks__/state.mock';
import { City } from '../entities/city.entity';

export const cityMock: City = {
  createdAt: new Date(),
  updatedAt: new Date(),
  id: 121,
  stateId: stateMock.id,
  name: 'Minas Gerais',
};
