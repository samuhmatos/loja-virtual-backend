import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Address } from '../address/entities/address.entity';
import { Category } from '../category/entities/category.entity';
import { City } from '../city/entities/city.entity';
import { Product } from '../product/entities/product.entity';
import { State } from '../state/entities/state.entity';
import { User } from '../user/entities/user.entity';
import { Cart } from '../cart/entities/cart.entity';
import { CartProduct } from '../cart-product/entities/cart-product.entity';
import { PaymentStatus } from '../payment-status/entities/payment-status.entity';
import { Payment } from '../payment/entities/payment.entity';
import { PaymentPix } from '../payment/entities/payment-pix.entity';
import { PaymentCreditCard } from '../payment/entities/payment-credit-cart.entity';
import { Order } from '../order/entities/order.entity';
import { OrderProduct } from '../order-product/entities/order-product.entity';

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
import { CreateTableStatus1709296000518 } from './migrations/1709295933446-create-table-status';
import { CreateTablePayment1709295933447 } from './migrations/1709295933447-create-table-payment';
import { CreateTableOrder1709297504100 } from './migrations/1709297504100-create-table-order';
import { CreateTableOrderProduct1709297516451 } from './migrations/1709297516451-create-table-order-product';

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
            PaymentStatus,
            Payment,
            PaymentPix,
            PaymentCreditCard,
            Order,
            OrderProduct,
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
            CreateTableStatus1709296000518,
            CreateTablePayment1709295933447,
            CreateTableOrder1709297504100,
            CreateTableOrderProduct1709297516451,
          ],
          migrationsRun: true,
        };
      },
    }),
  ],
})
export class DatabaseModule {}
