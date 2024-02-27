import { User } from '../entities/user.entity';
import { UserType } from '../enum/user-type.enum';

export const userMock: User = {
  cpf: '2342342323',
  createdAt: new Date(),
  updatedAt: new Date(),
  email: 'jao@gmail.com',
  name: 'joao',
  password: '$2b$10$CuiH9VfZK10oYGs71hHOse0iUScagvVHV5Yp6O/Ldz3Q1vanOqAYK', // password
  phone: '43534656',
  typeUser: UserType.User,
  id: 123123,
};
