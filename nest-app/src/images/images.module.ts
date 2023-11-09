import { Module } from '@nestjs/common';
import { ImagesService } from './images.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Images} from  "../images/entities/image.entity";
import {ProductsController} from "../products/products.controller";
import {Products} from "../products/entities/product.entity";
import {ProductsService} from "../products/products.service";
import {ProductsModule} from "../products/products.module";
import {ProductAttribute} from "../product_attributes/entities/product_attribute.entity";
import {ProductAttributesService} from "../product_attributes/product_attributes.service";



@Module({
  imports:[TypeOrmModule.forFeature([Images,Products,ProductAttribute])],
  exports: [TypeOrmModule],
  controllers: [ProductsController],
  providers: [ProductsService,ImagesService,ProductAttributesService],
})
export class ImagesModule {}
