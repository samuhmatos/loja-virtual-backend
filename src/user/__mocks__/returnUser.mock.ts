import { ReturnUserDto } from '../../user/dtos/returnUser.dto';
import { userMock } from './user.mock';

export const returnUserMock: ReturnUserDto = {
  id: userMock.id,
  name: userMock.name,
  cpf: userMock.cpf,
  email: userMock.email,
  phone: userMock.phone,
  typeUser: userMock.typeUser,
};
