import { IsEnum } from 'class-validator';
import { UserStatus } from 'src/generated/prisma/enums';

export class UpdateStudentStatusDto {
    @IsEnum(UserStatus)
    status: UserStatus;
}