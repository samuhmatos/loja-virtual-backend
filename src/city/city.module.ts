import { Module } from '@nestjs/common';
import { CityController } from './city.controller';
import { CityService } from './city.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { City } from './entities/city.entity';
import { CacheModule } from '../cache/cache.module';

@Module({
  imports: [CacheModule, TypeOrmModule.forFeature([City])],
  controllers: [CityController],
  providers: [CityService],
  exports: [CityService],
})
export class CityModule {}
