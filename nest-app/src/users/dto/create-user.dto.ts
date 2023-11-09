import {IsNotEmpty, IsString} from "class-validator";

export class CreateUserDto {

    @IsString({ message: 'Name must be a string.' })
    @IsNotEmpty({ message: 'Name must not be empty.' })
    username:string;

    @IsNotEmpty({ message: 'Password must not be empty.' })
    password:string;

    @IsNotEmpty({ message: 'Email must not be empty.' })
    email:string;
}
