import { Module } from '@nestjs/common';
import { ProductReviewService } from './product-review.service';
import { ProductReviewController } from './product-review.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ProductReview} from "./entities/product-review.entity";
import {ProductsService} from "../products/products.service";
import {UsersService} from "../users/users.service";
import {ReviewTypeService} from "../review_type/review_type.service";
import {User} from "../users/entities/user.entity";
import {Products} from "../products/entities/product.entity";
import {ReviewType} from "../review_type/entities/review_type.entity";
import {AuthService} from "../auth/auth.service";

@Module({
  imports:[TypeOrmModule.forFeature([ProductReview,User,Products,ReviewType])],
  exports: [TypeOrmModule],
  controllers: [ProductReviewController],
  providers: [ProductReviewService,UsersService,ProductsService,ReviewTypeService,AuthService],
})
export class ProductReviewModule {}
