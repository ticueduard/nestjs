import { Injectable ,BadRequestException} from '@nestjs/common';
import { Repository } from "typeorm";
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { InjectRepository } from "@nestjs/typeorm";
import {Images} from "./entities/image.entity";

@Injectable()
export class ImagesService {
  constructor(
      @InjectRepository(Images)
      private readonly imageRepository: Repository<Images>,
  ) {}

  async createImage(createImageDto: CreateImageDto): Promise<Images> {
    try {
      if (!createImageDto.imagePath) {
        throw new Error("Image path is missing");
      }

      console.log('Received createImageDto:', createImageDto);
      const newImage = new Images();
      newImage.imagePath = createImageDto.imagePath;
      newImage.productId = createImageDto.productId;

      const createdImage = await this.imageRepository.save(newImage);

      return createdImage;
    }catch (error) {
      throw error;
    }
  }


  async findOne(productId: number) {
    try {
      return await this.imageRepository.findOne({ where: { productId } });
    } catch (error) {
      throw error;
    }
  }
 async find(productId: number) {
    try {
      return await this.imageRepository.findOne({ where: { productId } });
    } catch (error) {
      throw error;
    }
  }

  async updateImage(productId: number, updateImageDto: UpdateImageDto): Promise<Images> {
    try {
      const existingImage = await this.imageRepository.findOne({where:{productId}});

      if (!existingImage) {
        throw new Error(`Image with ID ${productId} not found`);
      }
      existingImage.imagePath = updateImageDto.imagePath;
      existingImage.productId = updateImageDto.productId;

      const updatedImage = await this.imageRepository.save(existingImage);

      return updatedImage;
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number) {
    try {
      const result = await this.imageRepository.delete(id);
      if (result.affected === 0) {
        throw new Error(`Image with ID ${id} not found`);
      }
    }  catch (error) {
      throw error;
    }
  }
}
