import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { CreateTableUser1708097611609 } from './database/migrations/1708097611609-create_table_user';
import { CreateTableState1708103629835 } from './database/migrations/1708103629835-create_table_state';
import { CreateTableCity1708103642731 } from './database/migrations/1708103642731-create_table_city';
import { CreateTableAddress1708103653393 } from './database/migrations/1708103653393-create_table_address';
import { AlterTableState1708104742455 } from './database/migrations/1708104742455-alter-table-state';
import { InsertInState1708104752955 } from './database/migrations/1708104752955-insert-in-state';
import { InsertInCity1708104765469 } from './database/migrations/1708104765469-insert-in-city';
import { StateModule } from './state/state.module';
import { CityModule } from './city/city.module';
import { AddressModule } from './address/address.module';
import { City } from './city/entities/city.entity';
import { State } from './state/entities/state.entity';
import { Address } from './address/entities/address.entity';
import { CacheModule } from './cache/cache.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './guards/roles.guards';
import { JwtModule } from '@nestjs/jwt';
import { AlterTableUser1708365834851 } from './database/migrations/1708365834851-alter-table-user';
import { CreateCategoryTable1708523040904 } from './database/migrations/1708523040904-create-category-table';
import { CreateProductTable1708523053502 } from './database/migrations/1708523053502-create-product-table';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { Category } from './category/entities/category.entity';
import { Product } from './product/entities/product.entity';

@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [User, City, State, Address, Category, Product],
      migrations: [
        CreateTableUser1708097611609,
        CreateTableState1708103629835,
        CreateTableCity1708103642731,
        CreateTableAddress1708103653393,
        AlterTableState1708104742455,
        InsertInState1708104752955,
        InsertInCity1708104765469,
        AlterTableUser1708365834851,
        CreateCategoryTable1708523040904,
        CreateProductTable1708523053502,
      ],
      migrationsRun: true,
    }),
    StateModule,
    CityModule,
    AddressModule,
    CacheModule,
    AuthModule,
    JwtModule,
    CategoryModule,
    ProductModule,
  ],
  controllers: [AppController],
  providers: [AppService, { provide: APP_GUARD, useClass: RolesGuard }],
})
export class AppModule {}
