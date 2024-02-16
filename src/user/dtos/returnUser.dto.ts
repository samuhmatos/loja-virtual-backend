import { ReturnAddressDto } from 'src/address/dtos/returnAddress.dto';
import { User } from '../entities/user.entity';

export class ReturnUserDto {
  id: number;
  name: string;
  email: string;
  phone: string;
  cpf: string;
  typeUser: number;
  addresses?: ReturnAddressDto[];

  constructor(user: User) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.phone = user.phone;
    this.cpf = user.cpf;
    this.typeUser = user.typeUser;

    this.addresses = user.addresses
      ? user.addresses.map((address) => new ReturnAddressDto(address))
      : undefined;
  }
}
