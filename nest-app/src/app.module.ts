import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsService } from './products/products.service';
import { ProductsModule } from './products/products.module';
import { ImagesModule } from './images/images.module';
import {ImagesService} from "./images/images.service";
import { ReviewTypeModule } from './review_type/review_type.module';
import { UsersModule } from './users/users.module';
import { ProductReviewModule } from './product-review/product-review.module';
import {ProductReviewService} from "./product-review/product-review.service";
import {QAService} from "./qa/qa.service";
import { QAModule } from './qa/qa.module';
import { ProductAttributesModule } from './product_attributes/product_attributes.module';
import {ProductAttributesService} from "./product_attributes/product_attributes.service";
import {AuthModule} from "./auth/auth.module";
import {AuthService} from "./auth/auth.service";
import {UsersService} from "./users/users.service";
import {ReviewTypeService} from "./review_type/review_type.service";


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT, 10),
      username: process.env.POSTGRES_USER,
      password: (<string>process.env.POSTGRES_PASSWORD),
      database: process.env.POSTGRES_DATABASE,
      autoLoadEntities: true,
      synchronize: true,
    }),
    ProductsModule,
    ImagesModule,
    ReviewTypeModule,
    UsersModule,
    ProductReviewModule,
    QAModule,
    ProductAttributesModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService,AuthService, ProductsService,ImagesService,ReviewTypeService,UsersService,ProductReviewService,QAService,ProductAttributesService],
})
export class AppModule {}
