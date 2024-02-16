import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from './entities/address.entity';
import { Repository } from 'typeorm';
import { CreateAddressDto } from './dtos/createAddress.dto';
import { UserService } from 'src/user/user.service';
import { CityService } from 'src/city/city.service';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,

    private readonly userService: UserService,
    private readonly cityService: CityService,
  ) {}

  async create(
    createAddress: CreateAddressDto,
    userId: number,
  ): Promise<Address> {
    await this.userService.findById(userId);
    await this.cityService.findById(createAddress.cityId);

    return this.addressRepository.save({ ...createAddress, userId });
  }
}
