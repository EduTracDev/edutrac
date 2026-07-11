import { IsEnum } from 'class-validator';
import { UserStatus } from 'src/generated/prisma/enums';

export class UpdateTeacherStatusDto{
    @IsEnum(UserStatus)
    status: UserStatus;
}