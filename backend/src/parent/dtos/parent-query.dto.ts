import { IsEnum, IsOptional } from 'class-validator';
import { PaginationQueryDto } from 'src/core/dto/pagination-query.dto';
import { UserStatus } from 'src/generated/prisma/enums';

export class ParentQueryDto extends PaginationQueryDto {
    @IsOptional()
    @IsEnum(UserStatus)
    status?: UserStatus;

    @IsOptional()
    search?: string;

    @IsOptional()
    sortBy?: string;

    @IsOptional()
    order?: string;
}