import {IsNotEmpty, Max, Min} from "class-validator";

export class CreateProductReviewDto {
    "productId": number;
    "idReviewType": number;
    @IsNotEmpty()
    @Min(1, {message: 'Review must be at least 1'})
    @Max(5, {message: 'Review cannot be greater than 5'})
    "review": number;
    "userId": number;


}
