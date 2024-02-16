import {
  Body,
  Controller,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateAddressDto } from './dtos/createAddress.dto';
import { AddressService } from './address.service';
import { Address } from './entities/address.entity';

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @UsePipes(ValidationPipe)
  @Post('/:userId')
  async create(
    @Body() createAddress: CreateAddressDto,
    @Param('userId') userId: number,
  ): Promise<Address> {
    return this.addressService.create(createAddress, userId);
  }
}
