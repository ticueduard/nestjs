import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Products} from "./entities/product.entity";
import {ImagesService} from "../images/images.service";
import {Images} from "../images/entities/image.entity";
import {ProductAttributesService} from "../product_attributes/product_attributes.service";
import {ProductAttribute} from "../product_attributes/entities/product_attribute.entity";

@Module({
  imports:[TypeOrmModule.forFeature([Products,Images,ProductAttribute])],
  exports: [TypeOrmModule],
  controllers: [ProductsController],
  providers: [ProductsService,ImagesService,ProductAttributesService],
})
export class ProductsModule {}
