import { Module } from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressController } from './address.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from './entities/address.entity';
import { UserModule } from '../user/user.module';
import { CityModule } from '../city/city.module';

@Module({
  imports: [TypeOrmModule.forFeature([Address]), UserModule, CityModule],
  providers: [AddressService],
  controllers: [AddressController],
})
export class AddressModule {}
