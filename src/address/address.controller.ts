import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateAddressDto } from './dtos/createAddress.dto';
import { AddressService } from './address.service';
import { Address } from './entities/address.entity';
import { Roles } from '../decorators/roles.decorator';
import { UserType } from '../user/enum/user-type.enum';
import { UserId } from '../decorators/user-id.decorator';
import { ReturnAddressDto } from './dtos/returnAddress.dto';

@Controller('address')
@Roles(UserType.User, UserType.Admin)
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @UsePipes(ValidationPipe)
  @Post()
  async create(
    @Body() createAddress: CreateAddressDto,
    @UserId() userId: number,
  ): Promise<Address> {
    return this.addressService.create(createAddress, userId);
  }

  @Get()
  async findAllByUserId(@UserId() userId: number): Promise<ReturnAddressDto[]> {
    const addresses = await this.addressService.findAllByUserId(userId);

    return addresses.map((address) => new ReturnAddressDto(address));
  }
}
