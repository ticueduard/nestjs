import {Injectable} from '@nestjs/common';
import {CreateProfileDto} from './dto/create-profile.dto';
import {UpdateProfileDto} from './dto/update-profile.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Profile} from "./entities/profile.entity";


@Injectable()
export class ProfileService {
    constructor(
        @InjectRepository(Profile)
        private readonly profileRepository: Repository<Profile>,
    ) {
    }

    async create(createProfileDto: CreateProfileDto) {
        try {
            return await this.profileRepository.save(createProfileDto);
        } catch (error) {
            throw error;
        }
    }


    async findOneByUserId(userId: number) {
        try {
            return await this.profileRepository.findOne({where: {userId}});
        }catch (error) {
            throw error;
        }
    }


    async update(id: number, updateProfileDto: UpdateProfileDto) {
        try {
            const result = await this.profileRepository.update(id, updateProfileDto);
            if (result.affected === 0) {
                throw new Error(`Profile with ID ${id} not found`);
            }
        } catch (error) {
            throw error;
        }
    }

    async updateProfileByUserId(userId: number, updateProfileDto: UpdateProfileDto): Promise<Profile[]> {
        try {
            const updatedProfiles = await this.profileRepository.update({userId}, updateProfileDto);
            if (updatedProfiles.affected === 0) {
                throw new Error(`Profile with user ID ${userId} not found`);
            }
            return updatedProfiles.raw;
        } catch (error) {
            throw error;
        }
    }


    async remove(id: number) {
        try {
            const result = await this.profileRepository.delete(id);
            if (result.affected === 0) {
                throw new Error(`Profile with ID ${id} not found`);
            }
        } catch (error) {
            throw error;
        }
    }

}
