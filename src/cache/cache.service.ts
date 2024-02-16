import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class CacheService {
  constructor(
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  async get<T>(key: string, callbackFn: () => Promise<T>): Promise<T> {
    const cachedCities: T = await this.cacheManager.get(key);

    if (cachedCities) {
      return cachedCities;
    }

    const cities: T = await callbackFn();

    await this.cacheManager.set(key, cities);

    return cities;
  }
}
