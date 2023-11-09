import { Module } from '@nestjs/common';
import { ProductAttributesService } from './product_attributes.service';
import {ProductsController} from "../products/products.controller";
import {TypeOrmModule} from "@nestjs/typeorm";
import {ProductAttribute} from "./entities/product_attribute.entity";
import {Products} from "../products/entities/product.entity";
import {ProductsService} from "../products/products.service";
import {Images} from "../images/entities/image.entity";
import {ImagesService} from "../images/images.service";


@Module({
  imports:[TypeOrmModule.forFeature([ProductAttribute,Products,Images])],
  exports: [TypeOrmModule],
  controllers: [ProductsController],
  providers: [ProductAttributesService,ProductsService,ImagesService],
})
export class ProductAttributesModule {}
