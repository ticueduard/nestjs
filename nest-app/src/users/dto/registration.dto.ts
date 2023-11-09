import {IsNotEmpty, IsString} from "class-validator";

export class RegistrationDto{
    @IsString({ message: 'Name must be a string.' })
    @IsNotEmpty({ message: 'Name must not be empty.' })
    username:string;

    @IsNotEmpty({ message: 'Password must not be empty.' })
    password:string;

    @IsNotEmpty({ message: 'Email must not be empty.' })
    email:string;

    @IsNotEmpty({ message: 'Phone number must not be empty.' })
    phone:number;

    @IsString({ message: 'Country name must be a string.' })
    @IsNotEmpty({ message: 'Country name must not be empty.' })
    country:string;

    @IsString({ message: 'City name must be a string.' })
    @IsNotEmpty({ message: 'City name must not be empty.' })
    city:string;

    @IsString({ message: 'Adress must be a string.' })
    @IsNotEmpty({ message: 'Adress must not be empty.' })
    adressLine1:string;

    @IsString({ message: 'Adress must be a string.' })
    adressLine2:string;
}