import { Injectable } from '@nestjs/common';
import { CreateProductReviewDto } from './dto/create-product-review.dto';
import { UpdateProductReviewDto } from './dto/update-product-review.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {ProductReview} from "./entities/product-review.entity";
import {PaginationOptionsInterface} from "../paginate/pagination.option";
import {Pagination} from "../paginate/pagination";
import {User} from "../users/entities/user.entity";


@Injectable()
export class ProductReviewService {
  constructor(
      @InjectRepository(ProductReview)
      private readonly productReviewRepository: Repository<ProductReview>,
  ) {}

  async create(createProductReviewDto: CreateProductReviewDto) {
    try {
      return await this.productReviewRepository.save(createProductReviewDto);
    } catch (error) {
      throw error;
    }
  }

  async findAll(options: PaginationOptionsInterface): Promise<Pagination<ProductReview>> {
    const [results, total] = await this.productReviewRepository.findAndCount({
      relations: ["product", "user", "reviewType"],
      take: options.limit,
      skip: options.page,
    });

    return new Pagination<ProductReview>({
      results,
      total,
    });
  }


  async findOne(id: number) {
    try {
      return await this.productReviewRepository.findOne({where:{id}, relations: ["product", "user", "reviewType"] });
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, updateProductReviewDto: UpdateProductReviewDto) {
    try {
      const result = await this.productReviewRepository.update(id, updateProductReviewDto);
      if (result.affected === 0) {
        throw new Error("Failed to update the product review.");
      }
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number) {
    try {
      const result = await this.productReviewRepository.delete(id);
      if (result.affected === 0) {
        throw new Error("Failed to delete the product review.");
      }
    } catch (error) {
      throw error;
    }
  }
}
