import {Injectable} from '@nestjs/common';
import {CreateQADto} from './dto/create-qa.dto';
import {UpdateQADto} from './dto/update-qa.dto';
import {InjectRepository} from "@nestjs/typeorm";

import {Repository} from "typeorm";
import {QA} from "./entities/qa.entity";

@Injectable()
export class QAService {
    constructor(
        @InjectRepository(QA)
        private readonly qaRepository: Repository<QA>,
    ) {
    }

    async createQandA(createQADto: CreateQADto) {
        try {
            console.log("data");
            console.log(createQADto);
            return await this.qaRepository.save(createQADto);
        } catch (error) {
            throw error;
        }
    }


    async findAll() {
        try {
            return await this.qaRepository.find({relations: ["uQuestion", "uAnswer"]});
        } catch (error) {
            throw error;
        }
    }

    async findOne(id: number) {
        try {
            return await this.qaRepository.findOne({where: {id}, relations: ["uQuestion", "uAnswer", "product"]});
        } catch (error) {
            throw error;
        }
    }

    async findQuestionId(id: number) {
        try {
            console.log("id service");
            console.log(id);
            return await this.qaRepository.findOne({where: {id: id}});
        } catch (error) {
            throw error;
        }
    }

    async updateQuestion(question: QA): Promise<QA> {
        try {
            return this.qaRepository.save(question);
        } catch (error) {
            throw error;
        }
    }

    async update(id: number, updateQADto: UpdateQADto) {
        try {
            const result = await this.qaRepository.update(id, updateQADto);
            if (result.affected === 0) {
                throw new Error("Failed to update the question and answer.");
            }
            return result;
        } catch (error) {
            console.log(error);
            throw new Error(error.message);
        }
    }


    async remove(id: number) {
        try {
            const result = await this.qaRepository.delete(id);
            if (result.affected === 0) {
                throw new Error("Failed to delete the question and answer.");
            }
            return result;
        } catch (error) {
            throw new Error(error.message);
        }
    }
}
