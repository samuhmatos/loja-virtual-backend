import { User } from '../entities/user.entity';
import { UserType } from '../enum/user-type.enum';

export const userMock: User = {
  cpf: '2342342323',
  createdAt: new Date(),
  updatedAt: new Date(),
  email: 'jao@gmail.com',
  name: 'joao',
  password: 'password',
  phone: '43534656',
  typeUser: UserType.User,
  id: 123123,
};
