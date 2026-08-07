import { IsEnum } from 'class-validator';
import { UserStatus } from 'src/generated/prisma/enums';

export class UpdateParentStatusDto {
    @IsEnum(UserStatus)
    status: UserStatus;
}