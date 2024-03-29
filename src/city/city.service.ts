import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { City } from './entities/city.entity';
import { Repository } from 'typeorm';
import { CacheService } from '../cache/cache.service';

export type CityRepository = Repository<City>;
@Injectable()
export class CityService {
  constructor(
    @InjectRepository(City)
    private readonly cityRepository: CityRepository,

    private readonly cacheService: CacheService,
  ) {}

  async getAllCitiesByStateId(stateId: number): Promise<City[]> {
    return this.cacheService.get<City[]>(
      `state_${stateId}`,
      async () =>
        await this.cityRepository.find({
          where: {
            stateId,
          },
        }),
    );
  }

  async findById(cityId: number): Promise<City> {
    const city = await this.cityRepository.findOne({ where: { id: cityId } });

    if (!city) {
      throw new NotFoundException(`Cityid: ${cityId} Not Found `);
    }

    return city;
  }
}
