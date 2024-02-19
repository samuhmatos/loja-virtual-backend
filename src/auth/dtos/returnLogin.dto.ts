import { ReturnUserDto } from 'src/user/dtos/returnUser.dto';

export class ReturnLoginDto {
  user: ReturnUserDto;
  accessToken: string;
}
