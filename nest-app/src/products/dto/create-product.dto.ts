import {IsString, IsInt, IsNotEmpty, IsNumber, Min, IsNumberString} from 'class-validator';



export class CreateProductDto {
    @IsString({ message: 'Name must be a string.' })
    @IsNotEmpty({ message: 'Name must not be empty.' })
    name: string;


    @IsString({ message: 'Description must be a string.' })
    @IsNotEmpty({ message: 'Description must not be empty.' })
    description: string;


    @IsNotEmpty()
    price: number;

}
