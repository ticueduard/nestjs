import { PartialType } from '@nestjs/mapped-types';
import { CreateReviewTypeDto } from './create-review_type.dto';

export class UpdateReviewTypeDto extends PartialType(CreateReviewTypeDto) {
    id:number;
    name:string;

}
