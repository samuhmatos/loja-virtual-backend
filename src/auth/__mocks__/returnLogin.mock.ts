import { userMock } from '../../user/__mocks__/user.mock';
import { ReturnLoginDto } from '../dtos/returnLogin.dto';
import { JwtMock } from './jwt.mock';

export const returnLoginMock: ReturnLoginDto = {
  user: userMock,
  accessToken: JwtMock,
};
