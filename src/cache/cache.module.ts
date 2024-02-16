import { Module } from '@nestjs/common';
import { CacheModule as CacheModuleManager } from '@nestjs/cache-manager';
import { CacheService } from './cache.service';

@Module({
  imports: [
    CacheModuleManager.register({
      ttl: 90000000,
    }),
  ],
  providers: [CacheService],
  exports: [CacheService],
})
export class CacheModule {}
