import { IsEnum, IsOptional, IsString } from 'class-validator';
import { PaginationQueryDto } from 'src/core/dto/pagination-query.dto';
import { UserStatus } from 'src/generated/prisma/enums';

export enum TeacherSortField {
    CREATED_AT = 'createdAt',
    UPDATED_AT = 'updatedAt',
    EMPLOYEE_ID = 'employeeId',
    FIRST_NAME = 'firstName',
    LAST_NAME = 'lastName',
}

export enum SortOrder {
    ASC = 'asc',
    DESC = 'desc',
}

export class TeacherQueryDto extends PaginationQueryDto {
    @IsOptional()
    @IsEnum(UserStatus)
    status?: UserStatus;

    @IsOptional()
    @IsString()
    search?: string;

    @IsOptional()
    @IsEnum(TeacherSortField)
    sortBy: TeacherSortField = TeacherSortField.CREATED_AT;

    @IsOptional()
    @IsEnum(SortOrder)
    order: SortOrder = SortOrder.DESC;
}