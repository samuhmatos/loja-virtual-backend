import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from './entities/address.entity';
import { Repository } from 'typeorm';
import { CreateAddressDto } from './dtos/createAddress.dto';
import { UserService } from '../user/user.service';
import { CityService } from '../city/city.service';

export type AddressRepository = Repository<Address>;

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address)
    private readonly addressRepository: AddressRepository,

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

  async findAllByUserId(userId: number): Promise<Address[]> {
    const addresses = await this.addressRepository.find({
      where: {
        userId,
      },
      relations: {
        city: {
          state: true,
        },
      },
    });

    if (!addresses || addresses.length === 0) {
      throw new NotFoundException(`Addresses not found for userId: ${userId}`);
    }

    return addresses;
  }

  async findByIdAndUserId(addressId: number, userId: number): Promise<Address> {
    const address = await this.addressRepository.findOne({
      where: {
        id: addressId,
        userId,
      },
      relations: {
        city: {
          state: true,
        },
      },
    });

    if (!address) {
      throw new NotFoundException(
        `address id: ${addressId} not found for userId ${userId}`,
      );
    }

    return address;
  }
}
