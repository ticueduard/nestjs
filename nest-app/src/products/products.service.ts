import { Injectable } from '@nestjs/common';
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import {Products} from "./entities/product.entity";
import {PaginationOptionsInterface} from "../paginate/pagination.option";
import {Pagination} from "../paginate/pagination";
import {User} from "../users/entities/user.entity";


@Injectable()
export class ProductsService {
  constructor(
      @InjectRepository(Products)
      private readonly productRepository: Repository<Products>,
  ) {}

  async isProductUnique(name) {
    try {
      return await this.productRepository.findOne({ where: { name } });
    }catch (error) {
      throw error;
    }
  }


  async createProduct(createProductDto: CreateProductDto) {
    try {
      return await this.productRepository.save(createProductDto);
    }catch (error) {
      throw error;
    }
  }



  async getAllProducts(
      options: PaginationOptionsInterface,
  ): Promise<Pagination<Products>> {
    const [results, total] = await this.productRepository.findAndCount({
      relations: ["images","attribute"],
      take: options.limit,
      skip: options.page,
    });


    return new Pagination<Products>({
      results,
      total,
    });
  }


  async getProductId(id: number) {
    try {
      return await this.productRepository.findOne({ where: { id }, relations: ["images","attribute"]  });
    }catch (error) {
      throw error;
    }
  }

  async updateProduct(id: number, updateProductDto: UpdateProductDto) {
    try {
      const result = await this.productRepository.update(id, updateProductDto);
      if (result.affected === 0) {
        throw new Error(`Product with ID ${id} not found`);
      }
    } catch (error) {
      throw error;
    }
  }

  async deleteProduct(id: number) {
    try {
      const result = await this.productRepository.delete(id);
      if (result.affected === 0) {
        throw new Error(`Product with ID ${id} not found`);
      }
    } catch (error) {
      throw error;
    }
  }
}
