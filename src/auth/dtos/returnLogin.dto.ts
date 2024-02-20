import { ReturnUserDto } from '../../user/dtos/returnUser.dto';

export class ReturnLoginDto {
  user: ReturnUserDto;
  accessToken: string;
}
