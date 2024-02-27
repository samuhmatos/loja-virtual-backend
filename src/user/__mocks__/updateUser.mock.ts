import { UpdatePasswordDto } from '../dtos/update-password.dto';

export const updatePasswordMock: UpdatePasswordDto = {
  lastPassword: 'password',
  newPassword: 'newPassword',
};

export const updateInvalidPasswordMock: UpdatePasswordDto = {
  lastPassword: 'wrongLastPassword',
  newPassword: 'newPassword',
};
