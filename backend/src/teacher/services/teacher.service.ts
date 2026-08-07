import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { TeacherQueryDto } from '../dto/teacher-query.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, UserStatus } from 'src/generated/prisma/client';
import { UpdateTeacherDto } from '../dto/update-teacher.dto';
import { UpdateTeacherStatusDto } from '../dto/update-teacher-status.dto';
UpdateTeacherDto

@Injectable()
export class TeacherService {
    constructor(private prisma: PrismaService){}
    
    async findAll(
        tenantId: number,
        query: TeacherQueryDto,
    ) {
        const {
            page,
            limit,
            search,
            status,
            sortBy = 'createdAt',
            order = 'desc',
        } = query;

        const skip = (page - 1) * limit;

        const where: Prisma.TeacherWhereInput = {
            tenantId,

            ...(status && {
                user: {
                    is: {
                        status,
                    },
                },
            }),

            ...(search && {
                OR: [
                    {
                        user: {
                            is: {
                                firstName: {
                                    contains: search,
                                    mode: Prisma.QueryMode.insensitive,
                                },
                            },
                        },
                    },
                    {
                        user: {
                            is: {
                                lastName: {
                                    contains: search,
                                    mode: Prisma.QueryMode.insensitive,
                                },
                            },
                        },
                    },
                    {
                        employeeId: {
                            contains: search,
                            mode: Prisma.QueryMode.insensitive,
                        },
                    },
                ],
            }),
        };

        let orderBy: Prisma.TeacherOrderByWithRelationInput;

        switch (sortBy) {
            case 'employeeId':
                orderBy = {
                    employeeId: order as Prisma.SortOrder,
                };
                break;

            case 'firstName':
                orderBy = {
                    user: {
                        firstName: order as Prisma.SortOrder,
                    },
                };
                break;

            case 'lastName':
                orderBy = {
                    user: {
                        lastName: order as Prisma.SortOrder,
                    },
                };
                break;

            case 'updatedAt':
                orderBy = {
                    updatedAt: order as Prisma.SortOrder,
                };
                break;

            default:
                orderBy = {
                    createdAt: order as Prisma.SortOrder,
                };
        }

        const [teachers, total] = await this.prisma.$transaction([
            this.prisma.teacher.findMany({
                where,
                include: {
                    user: true,
                },
                skip,
                take: limit,
                orderBy,
            }),

            this.prisma.teacher.count({
                where,
            }),
        ]);

        return {
            success: true,
            message: 'Teachers retrieved successfully.',
            data: teachers,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        };
    }


    async findOne(
        tenantId: number,
        publicId: string,
    ) {
        const teacher = await this.prisma.teacher.findFirst({
            where: {
                tenantId,
                publicId,
            },
            include: {
                user: true,
            },
        });

        if (!teacher) {
            throw new NotFoundException(
                'Teacher not found.',
            );
        }

        return {
            success: true,
            message: 'Teacher retrieved successfully.',
            data: teacher,
            error: null,
        };
    }

    async update(
        tenantId: number,
        publicId: string,
        dto: UpdateTeacherDto,
    ) {
        return this.prisma.$transaction(async (tx) => {
            const teacher = await tx.teacher.findFirst({
                where: {
                    tenantId,
                    publicId,
                },
                include: {
                    user: true,
                },
            });

            if (!teacher) throw new NotFoundException('Teacher not found.');
            if (dto.employeeId && dto.employeeId !== teacher.employeeId) {
                const exists = await tx.teacher.findFirst({
                    where: {
                        tenantId,
                        employeeId: dto.employeeId,
                        NOT: {
                            id: teacher.id,
                        },
                    },
                });

                if (exists) throw new BadRequestException('Employee ID already exists.');
            }
            const teacherData: Prisma.TeacherUpdateInput = {};

            if (dto.employeeId !== undefined) teacherData.employeeId = dto.employeeId;
            if (dto.contactNumber !== undefined) teacherData.contactNumber = dto.contactNumber;
            if (dto.qualifications !== undefined) teacherData.qualifications = dto.qualifications;
            if (dto.specialization !== undefined) teacherData.specialization = dto.specialization;

            const userData: Prisma.UserUpdateInput = {};

            if (dto.firstName !== undefined) userData.firstName = dto.firstName;
            if (dto.lastName !== undefined) userData.lastName = dto.lastName;
            if (dto.status !== undefined) userData.status = dto.status;

            if (Object.keys(teacherData).length > 0) {
                await tx.teacher.update({
                    where: {
                        id: teacher.id,
                    },
                    data: teacherData,
                });
            }
            if (Object.keys(userData).length > 0) {
                await tx.user.update({
                    where: {
                        id: teacher.userId,
                    },
                    data: userData,
                });
            }

            const updatedTeacher = await tx.teacher.findUnique({
                where: {
                    id: teacher.id,
                },
                include: {
                    user: true,
                },
            });

            return {
                success: true,
                message: 'Teacher updated successfully.',
                data: updatedTeacher,
                error: null,
            };
        });
    }

    
    async updateStatus(tenantId: number, publicId: string, dto: UpdateTeacherStatusDto) {
        return this.prisma.$transaction(async (tx) => {
            const teacher = await tx.teacher.findFirst({
                where: {
                    tenantId,
                    publicId,
                },
                include: {
                    user: true,
                },
            });
            if (!teacher) throw new NotFoundException('Teacher not found.');
            if (teacher.user.status === dto.status) throw new BadRequestException(`Teacher is already ${dto.status.toLowerCase()}.`);
            await tx.user.update({
                where: {
                    id: teacher.userId,
                },
                data: {
                    status: dto.status,
                },
            });

            return {
                success: true,
                message: 'Teacher status updated successfully.',
                data: null,
                error: null,
            };
        });
    }

    async getStatistics(tenantId: number) {
        const [ total,active, invited, suspended, disabled, thisMonth ] = await this.prisma.$transaction([
            this.prisma.teacher.count({
                where: {
                    tenantId,
                },
            }),

            this.prisma.teacher.count({
                where: {
                    tenantId,
                    user: {
                        is: {
                            status: UserStatus.ACTIVE,
                        },
                    },
                },
            }),

            this.prisma.teacher.count({
                where: {
                    tenantId,
                    user: {
                        is: {
                            status: UserStatus.INVITED,
                        },
                    },
                },
            }),

            this.prisma.teacher.count({
                where: {
                    tenantId,
                    user: {
                        is: {
                            status: UserStatus.SUSPENDED,
                        },
                    },
                },
            }),

            this.prisma.teacher.count({
                where: {
                    tenantId,
                    user: {
                        is: {
                            status: UserStatus.DISABLED,
                        },
                    },
                },
            }),

            this.prisma.teacher.count({
                where: {
                    tenantId,
                    createdAt: {
                        gte: new Date(
                            new Date().getFullYear(),
                            new Date().getMonth(),
                            1,
                        ),
                    },
                },
            }),
        ]);

        return {
            success: true,
            message: 'Teacher statistics retrieved successfully.',
            data: {
                total,
                active,
                invited,
                suspended,
                disabled,
                thisMonth,
                inactive: suspended + disabled
            },
        };
    }
}