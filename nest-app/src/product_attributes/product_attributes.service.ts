import { Injectable } from '@nestjs/common';
import { CreateProductAttributeDto } from './dto/create-product_attribute.dto';
import { UpdateProductAttributeDto } from './dto/update-product_attribute.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {ProductAttribute} from "./entities/product_attribute.entity";

@Injectable()
export class ProductAttributesService {
  constructor(
      @InjectRepository(ProductAttribute)
      private readonly productAttributeRepository: Repository<ProductAttribute>,
  ) {}

  async create(createProductAttributeDto: CreateProductAttributeDto) {
    try {
      return await this.productAttributeRepository.save(createProductAttributeDto);
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      return await this.productAttributeRepository.find();
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number) {
    try {
      return await this.productAttributeRepository.findOne({where:{id}});
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, updateProductAttributeDto: UpdateProductAttributeDto) {
    try {
      const result = await this.productAttributeRepository.update(id, updateProductAttributeDto);
      if (result.affected === 0) {
        throw new Error("Failed to update the product attribute.");
      }
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number) {
    try {
      const result = await this.productAttributeRepository.delete(id);
      if (result.affected === 0) {
        throw new Error("Failed to delete the product attribute.");
      }
    } catch (error) {
      throw error;
    }
  }
}
