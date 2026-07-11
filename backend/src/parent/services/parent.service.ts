import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { ParentQueryDto } from '../dtos/parent-query.dto';
import { UpdateParentDto } from '../dtos/update-parent.dto';
import { UpdateParentStatusDto } from '../dtos/update-parent-status.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, UserStatus } from 'src/generated/prisma/client';




@Injectable()
export class ParentService {
    constructor(private readonly prisma: PrismaService) {}

    async findAll(tenantId: number, query: ParentQueryDto) {
        const { page, limit, search, status, sortBy = 'createdAt', order = 'desc' } = query;

        const skip = (page - 1) * limit;

        const where: Prisma.ParentWhereInput = {
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
                        user: {
                            is: {
                                email: {
                                    contains: search,
                                    mode: Prisma.QueryMode.insensitive,
                                },
                            },
                        },
                    },
                    {
                        contactNumber: {
                            contains: search,
                            mode: Prisma.QueryMode.insensitive,
                        },
                    },
                ],
            }),
        };

        let orderBy: Prisma.ParentOrderByWithRelationInput;

        switch (sortBy) {
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

        const [parents, total] = await this.prisma.$transaction([
            this.prisma.parent.findMany({
                where,
                include: {
                    user: true,

                    studentLinks: {
                        include: {
                            student: {
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

            this.prisma.parent.count({
                where,
            }),
        ]);

        return {
            success: true,
            message: 'Parents retrieved successfully.',
            data: parents,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
            error: null,
        };
    }
    
    async getStatistics(tenantId: number) {
        const [
            totalParents,
            activeParents,
            suspendedParents,
            disabledParents,
        ] = await this.prisma.$transaction([
            this.prisma.parent.count({
                where: {
                    tenantId,
                },
            }),

            this.prisma.parent.count({
                where: {
                    tenantId,
                    user: {
                        is: {
                            status: UserStatus.ACTIVE,
                        },
                    },
                },
            }),

            this.prisma.parent.count({
                where: {
                    tenantId,
                    user: {
                        is: {
                            status: UserStatus.SUSPENDED,
                        },
                    },
                },
            }),

            this.prisma.parent.count({
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
            message: 'Parent statistics retrieved successfully.',
            data: {
                totalParents,
                activeParents,
                suspendedParents,
                disabledParents,
            },
            error: null,
        };
    }
    
    async findOne(tenantId: number, publicId: string) {
        const parent = await this.prisma.parent.findFirst({
            where: {
                tenantId,
                publicId,
            },
            include: {
                user: true,

                studentLinks: {
                    include: {
                        student: {
                            include: {
                                user: {
                                    select: {
                                        publicId: true,
                                        firstName: true,
                                        lastName: true,
                                        email: true,
                                        status: true,
                                    },
                                },
                            },
                        },
                    },
                },
            },
        });
        if (!parent) throw new NotFoundException('Parent not found.');
        /**
         * The commented line below would be implemented after testing
         */
        // const students = parent.studentLinks.map(link => ({
        //     publicId: link.student.publicId,
        //     studentId: link.student.studentId,
        //     gradeLevel: link.student.gradeLevel,
        //     firstName: link.student.user.firstName,
        //     lastName: link.student.user.lastName,
        //     email: link.student.user.email,
        //     status: link.student.user.status,
        // }));
        // return {
        //     success: true,
        //     message: 'Parent retrieved successfully.',
        //     data: {
        //         ...parent,
        //         studentLinks: undefined,
        //         students,                
        //     },
        //     error: null
        // }
        return {
            success: true,
            message: 'Parent retrieved successfully.',
            data: parent,
            error: null,
        };
    }
    
    async update(tenantId: number, publicId: string, dto: UpdateParentDto) {
        return this.prisma.$transaction(async (tx) => {
            const parent = await tx.parent.findFirst({
                where: {
                    tenantId,
                    publicId,
                },
                include: {
                    user: true,
                },
            });
            if (!parent) throw new NotFoundException('Parent not found.');

            const updatedParent = await tx.parent.update({
                where: {
                    id: parent.id,
                },
                data: {
                    contactNumber: dto.contactNumber,
                    address: dto.address,
                },
                include: {
                    user: true,
                },
            });

            /*
            Future Enhancement: update User details.

            await tx.user.update({
                where: {
                    id: parent.userId,
                },
                data: {
                    firstName: dto.firstName,
                    lastName: dto.lastName,
                    email: dto.email,
                },
            });
            */

            return {
                success: true,
                message: 'Parent updated successfully.',
                data: updatedParent,
                error: null,
            };
        });
    }
    
    async updateStatus(
        tenantId: number,
        publicId: string,
        dto: UpdateParentStatusDto,
    ) {
        return this.prisma.$transaction(async (tx) => {
            const parent = await tx.parent.findFirst({
                where: {
                    tenantId,
                    publicId,
                },
                include: {
                    user: true,
                },
            });
            if (!parent) throw new NotFoundException('Parent not found.');
            if (parent.user.status === dto.status) throw new BadRequestException(`Parent is already ${dto.status.toLowerCase()}.`);

            await tx.user.update({
                where: {
                    id: parent.userId,
                },
                data: {
                    status: dto.status,
                },
            });

            const updatedParent = await tx.parent.findUnique({
                where: {
                    id: parent.id,
                },
                include: {
                    user: true,
                },
            });

            return {
                success: true,
                message: `Parent status updated to ${dto.status}.`,
                data: updatedParent,
                error: null,
            };
        });
    }
    
    async getStudents(tenantId: number, publicId: string) {
        const parent = await this.prisma.parent.findFirst({
            where: {
                tenantId,
                publicId,
            },
            include: {
                user: true,
                studentLinks: {
                    include: {
                        student: {
                            include: {
                                user: true,
                            },
                        },
                    },
                },
            },
        });
        if (!parent) throw new NotFoundException('Parent not found.');

        const students = parent.studentLinks.map((link) => ({
            publicId: link.student.publicId,
            studentId: link.student.studentId,
            gradeLevel: link.student.gradeLevel,
            gender: link.student.gender,
            dateOfBirth: link.student.dateOfBirth,
            contactNumber: link.student.contactNumber,
            address: link.student.address,

            user: {
                publicId: link.student.user.publicId,
                firstName: link.student.user.firstName,
                lastName: link.student.user.lastName,
                email: link.student.user.email,
                status: link.student.user.status,
            },
        }));

        return {
            success: true,
            message: 'Parent students retrieved successfully.',
            data: students,
            error: null,
        };
    }
}




