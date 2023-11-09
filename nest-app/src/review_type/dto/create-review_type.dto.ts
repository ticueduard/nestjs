import {IsNotEmpty, IsString} from "class-validator";

export class CreateReviewTypeDto {
    id:number;


    @IsString({ message: 'Name must be a string.' })
    @IsNotEmpty({ message: 'Name must not be empty.' })
    name:string;
}
