import {Injectable} from '@nestjs/common';
import {CreateUserDto} from './dto/create-user.dto';
import {UpdateUserDto} from './dto/update-user.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {User} from "./entities/user.entity";
import {Pagination} from "../paginate/pagination";
import {PaginationOptionsInterface} from "../paginate/pagination.option";
import * as bcrypt from 'bcrypt';



@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {

    }

    async create(createUserDto: CreateUserDto) {
        try {
            const saltRounds=parseInt(process.env.SALT_ROUNDS);
            createUserDto.password = await bcrypt.hash(createUserDto.password,saltRounds);
            return await this.userRepository.save(createUserDto);
        } catch (error) {
            throw error;
        }
    }




    async findAll(options: PaginationOptionsInterface): Promise<Pagination<User>> {
        try {
            const [results, total] = await this.userRepository.findAndCount({
                relations: ["profile"],
                take: options.limit,
                skip: options.page,
            });

            return new Pagination<User>({
                results,
                total,
            });
        }catch (error) {
            throw error;
        }
    }



    async findUsername(username: string) {
        try {
            return await this.userRepository.findOne({where: {username}});
        } catch (error) {
            throw error;
        }
    }

    async findEmail(email: string) {
        try {
            return await this.userRepository.findOne({where: {email}});
        } catch (error) {
            throw error;
        }
    }

    async findOne(id: number) {
        try {
            return await this.userRepository.findOne({where: {id}});
        } catch (error) {
            throw error;
        }
    }

    async update(id: number, updateUserDto: UpdateUserDto) {
        try {
            const result = await this.userRepository.update(id, updateUserDto);
            if (result.affected === 0) {
                throw new Error(`User with ID ${id} not found`);
            }
        } catch (error) {
            throw error;
        }
    }

    async remove(id: number) {
        try {
            const result = await this.userRepository.delete(id);
            if (result.affected === 0) {
                throw new Error(`User with ID ${id} not found`);
            }
        } catch (error) {
            throw error;
        }
    }


}
