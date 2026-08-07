import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateStudentDto } from '../dto/update-student.dto';
import { UpdateStudentStatusDto } from '../dto/update-student-status.dto';
import { StudentQueryDto } from '../dto/student-query.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, UserStatus } from 'src/generated/prisma/client';

@Injectable()
export class StudentService {
    constructor(private readonly prisma: PrismaService) {}

    async findAll(tenantId: number, query: StudentQueryDto) {
        const { page, limit, search, status, sortBy = 'createdAt', order = 'desc' } = query;

        const skip = (page - 1) * limit;
        const where: Prisma.StudentWhereInput = {
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
                        studentId: {
                            contains: search,
                            mode: Prisma.QueryMode.insensitive,
                        },
                    },
                ],
            }),
        };
        let orderBy: Prisma.StudentOrderByWithRelationInput;

        switch (sortBy) {
            case 'studentId':
                orderBy = {
                    studentId: order as Prisma.SortOrder,
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
        const [students, total] = await this.prisma.$transaction([
            this.prisma.student.findMany({
                where,
                include: {
                    user: true,
                    parentLinks: {
                        include: {
                            parent: {
                                include: {
                                    user: true,
                                },
                            },
                        },
                    },
                },
                skip,
                take: limit,
                orderBy,
            }),

            this.prisma.student.count({
                where,
            }),
        ]);
        return {
            success: true,
            message: 'Students retrieved successfully.',
            data: students,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
            error: null,
        };
    }        
        

    async findOne(tenantId: number, publicId: string) {
        const student = await this.prisma.student.findFirst({
            where: {
                tenantId,
                publicId,
            },
            include: {
                user: true,

                parentLinks: {
                    include: {
                        parent: {
                            include: {
                                user: true,
                            },
                        },
                    },
                },

                tenant: {
                    select: {
                        publicId: true,
                        school_name: true,
                    },
                },
            },
        });
        if (!student) throw new NotFoundException('Student not found.')

        return {
            success: true,
            message: 'Student retrieved successfully.',
            data: student,
            error: null,
        };
    }

    async update(tenantId: number, publicId: string, dto: UpdateStudentDto) {
        return this.prisma.$transaction(async (tx) => {
            const student = await tx.student.findFirst({
                where: {
                    tenantId,
                    publicId,
                },
                include: {
                    user: true,
                },
            });
            if (!student) throw new NotFoundException('Student not found.');

            const {firstName, lastName, email, contactNumber, address, dateOfBirth, gender, gradeLevel} = dto;

            await tx.user.update({
                where: {
                    id: student.userId,
                },
                data: {
                    ...(firstName !== undefined && { firstName }),
                    ...(lastName !== undefined && { lastName }),
                    ...(email !== undefined && { email }),
                },
            });

            const updatedStudent = await tx.student.update({
                where: {
                    id: student.id,
                },
                data: {
                    ...(contactNumber !== undefined && { contactNumber }),
                    ...(address !== undefined && { address }),
                    ...(dateOfBirth !== undefined && {
                        dateOfBirth: new Date(dateOfBirth),
                    }),
                    ...(gender !== undefined && { gender }),
                    ...(gradeLevel !== undefined && { gradeLevel }),
                },
                include: {
                    user: true,
                    parentLinks: {
                        include: {
                            parent: {
                                include: {
                                    user: true,
                                },
                            },
                        },
                    },
                },
            });

            return {
                success: true,
                message: 'Student updated successfully.',
                data: updatedStudent,
                error: null,
            };
        });
    }

    async updateStatus(tenantId: number, publicId: string, dto: UpdateStudentStatusDto) {
        return this.prisma.$transaction(async (tx) => {
            const student = await tx.student.findFirst({
                where: {
                    tenantId,
                    publicId,
                },
                include: {
                    user: true,
                },
            });

            if (!student) throw new NotFoundException('Student not found.');
            if (student.user.status === dto.status) throw new BadRequestException(`Student is already ${dto.status.toLowerCase()}.`)

            const updatedUser = await tx.user.update({
                where: {
                    id: student.userId,
                },
                data: {
                    status: dto.status,
                },
            });

            return {
                success: true,
                message: `Student status updated to ${dto.status.toLowerCase()} successfully.`,
                data: updatedUser,
                error: null,
            };
        });
    }

    async getStatistics(tenantId: number) {
        const [totalStudents, activeStudents, suspendedStudents, disabledStudents] = await this.prisma.$transaction([
            this.prisma.student.count({
                where: {
                    tenantId,
                },
            }),

            this.prisma.student.count({
                where: {
                    tenantId,
                    user: {
                        is: {
                            status: UserStatus.ACTIVE,
                        },
                    },
                },
            }),

            this.prisma.student.count({
                where: {
                    tenantId,
                    user: {
                        is: {
                            status: UserStatus.SUSPENDED,
                        },
                    },
                },
            }),

            this.prisma.student.count({
                where: {
                    tenantId,
                    user: {
                        is: {
                            status: UserStatus.DISABLED,
                        },
                    },
                },
            }),
        ]);

        return {
            success: true,
            message: 'Student statistics retrieved successfully.',
            data: {
                totalStudents,
                activeStudents,
                suspendedStudents,
                disabledStudents,
            },
            error: null,
        };
    }
}