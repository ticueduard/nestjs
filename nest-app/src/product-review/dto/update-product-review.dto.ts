import { PartialType } from '@nestjs/mapped-types';
import { CreateProductReviewDto } from './create-product-review.dto';
import {IsNotEmpty, Max, Min} from "class-validator";
import {Exclude, Transform} from "class-transformer";

export class UpdateProductReviewDto extends PartialType(CreateProductReviewDto) {

    @Transform(({ value, obj }) => {
        return obj.productId;
    })

    productId: number;
    @IsNotEmpty()
    @Min(1, { message: 'Review must be at least 1' })
    @Max(5, { message: 'Review cannot be greater than 5' })
    review:number;
}
