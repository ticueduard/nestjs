import {Injectable} from '@nestjs/common';
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {CreateReviewTypeDto} from './dto/create-review_type.dto';
import {UpdateReviewTypeDto} from './dto/update-review_type.dto';
import {ReviewType} from "./entities/review_type.entity";

@Injectable()
export class ReviewTypeService {
    constructor(
        @InjectRepository(ReviewType)
        private readonly reviewRepository: Repository<ReviewType>,
    ) {
    }

    async create(createReviewTypeDto: CreateReviewTypeDto) {
        try {
            return await this.reviewRepository.save(createReviewTypeDto);
        } catch (error) {
            throw error;
        }
    }

    async findAll() {
        try {
            return await this.reviewRepository.find();
        } catch (error) {
            throw error;
        }
    }

    async findOne(id: number) {
        try {
            return await this.reviewRepository.findOne({where: {id}});
        } catch (error) {
            throw error;
        }
    }


    async update(id: number, updateReviewTypeDto: UpdateReviewTypeDto) {
        try {
            const result = await this.reviewRepository.update(id, updateReviewTypeDto);
            if (result.affected === 0) {
                throw new Error(`Review type with ID ${id} not found`);
            }
        } catch (error) {
            throw error;
        }
    }

    async remove(id: number) {
        try {
            const result = await this.reviewRepository.delete(id);
            if (result.affected === 0) {
                throw new Error(`Review type with ID ${id} not found`);
            }
        } catch (error) {
            throw error;
        }
    }
}
