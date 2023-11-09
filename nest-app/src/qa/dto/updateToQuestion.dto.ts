import { PartialType } from '@nestjs/mapped-types';
import { CreateQADto, } from './create-qa.dto';

export class UpdateToQuestionDto extends PartialType(CreateQADto) {
    answer?:string;
    userAnswer?:string;
}
