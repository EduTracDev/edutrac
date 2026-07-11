import { IsEnum, IsOptional, IsString, MaxLength } from 'class-validator';
import { UserStatus } from 'src/generated/prisma/enums';

export class UpdateTeacherDto {
    @IsOptional()
    @IsString()
    @MaxLength(100)
    firstName?: string;

    @IsOptional()
    @IsString()
    @MaxLength(100)
    lastName?: string;

    @IsOptional()
    @IsString()
    @MaxLength(50)
    employeeId?: string;

    @IsOptional()
    @IsString()
    @MaxLength(30)
    contactNumber?: string;

    @IsOptional()
    @IsString()
    qualifications?: string;

    @IsOptional()
    @IsString()
    specialization?: string;

    @IsOptional()
    @IsEnum(UserStatus)
    status?: UserStatus;
}