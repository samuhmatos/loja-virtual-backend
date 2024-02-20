import {
  Body,
  Controller,
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

@Controller('address')
@Roles(UserType.User)
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
}
