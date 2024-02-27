import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Address } from 'src/address/entities/address.entity';
import { Category } from 'src/category/entities/category.entity';
import { City } from 'src/city/entities/city.entity';
import { Product } from 'src/product/entities/product.entity';
import { State } from 'src/state/entities/state.entity';
import { User } from 'src/user/entities/user.entity';
import { Cart } from 'src/cart/entities/cart.entity';

import { CreateTableUser1708097611609 } from './migrations/1708097611609-create_table_user';
import { CreateTableState1708103629835 } from './migrations/1708103629835-create_table_state';
import { CreateTableCity1708103642731 } from './migrations/1708103642731-create_table_city';
import { CreateTableAddress1708103653393 } from './migrations/1708103653393-create_table_address';
import { AlterTableState1708104742455 } from './migrations/1708104742455-alter-table-state';
import { InsertInState1708104752955 } from './migrations/1708104752955-insert-in-state';
import { InsertInCity1708104765469 } from './migrations/1708104765469-insert-in-city';
import { AlterTableUser1708365834851 } from './migrations/1708365834851-alter-table-user';
import { CreateCategoryTable1708523040904 } from './migrations/1708523040904-create-category-table';
import { CreateProductTable1708523053502 } from './migrations/1708523053502-create-product-table';
import { InsertRootInUser1708538550074 } from './migrations/1708538550074-insert-root-in-user';
import { CreateTableCart1709039097609 } from './migrations/1709039097609-create-table-cart';
import { CreateTableCartProduct1709040218909 } from './migrations/1709040218909-create-table-cart-product';
import { AlterTableCart1709041408454 } from './migrations/1709041408454-alter-table-cart';
import { CartProduct } from 'src/cart-product/entities/cart-product.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () => {
        return {
          type: 'postgres',
          host: process.env.DB_HOST,
          port: Number(process.env.DB_PORT),
          username: process.env.DB_USER,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_DATABASE,
          entities: [
            User,
            City,
            State,
            Address,
            Category,
            Product,
            Cart,
            CartProduct,
          ],
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
            InsertRootInUser1708538550074,
            CreateTableCart1709039097609,
            CreateTableCartProduct1709040218909,
            AlterTableCart1709041408454,
          ],
          migrationsRun: true,
        };
      },
    }),
  ],
})
export class DatabaseModule {}
