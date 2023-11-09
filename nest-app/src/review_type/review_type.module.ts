import { Module } from '@nestjs/common';
import { ReviewTypeService } from './review_type.service';
import { ReviewTypeController } from './review_type.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ReviewType} from "./entities/review_type.entity";


@Module({
  imports:[TypeOrmModule.forFeature([ReviewType])],
  exports: [TypeOrmModule],
  controllers: [ReviewTypeController],
  providers: [ReviewTypeService],
})
export class ReviewTypeModule {}
