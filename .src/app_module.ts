import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { User } from './user/user.entity';
import { Product } from './product/product.entity';
import { Order } from './order/order.entity';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';
import { ProductController } from './product/product.controller';
import { ProductService } from './product/product.service';
import { OrderController } from './order/order.controller';
import { OrderService } from './order/order.service';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '21148', 10),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [User, Product, Order],
      synchronize: true,
      ssl: {
        rejectUnauthorized: false,
      },
    }),
    UserModule,
    AuthModule,
    ProductModule,
    OrderModule,
  ],
})
export class AppModule {}
