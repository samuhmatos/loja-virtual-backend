import { ReturnCityDto } from '../../city/dtos/returnCity.dto';
import { Address } from '../entities/address.entity';

export class ReturnAddressDto {
  id: number;
  complement: string;
  numberAddress: number;
  cep: string;
  city?: ReturnCityDto;

  constructor(address: Address) {
    this.id = address.id;
    this.complement = address.complement;
    this.numberAddress = address.numberAddress;
    this.cep = address.cep;

    this.city = address.city ? new ReturnCityDto(address.city) : undefined;
  }
}
