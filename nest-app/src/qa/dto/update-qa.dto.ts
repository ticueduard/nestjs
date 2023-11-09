import { PartialType } from '@nestjs/mapped-types';
import { CreateQADto, } from './create-qa.dto';

export class UpdateQADto extends PartialType(CreateQADto) {
    question?:string;
    answer?:string;
    userQuestion?:string;
    userAnswer?:string;
}
