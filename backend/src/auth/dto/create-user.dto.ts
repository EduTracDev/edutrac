import {IsString, IsNotEmpty} from 'class-validator';

class CreateUserDto{
    @IsString()
    @IsNotEmpty()
    email: string

    @IsString()
    @IsNotEmpty()
    password: string
}