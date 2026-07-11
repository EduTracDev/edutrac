import { Controller, Get, Param, Patch, Body, Query } from '@nestjs/common';
import { StudentService } from '../services/student.service';
import { Tenant } from 'src/core/decorators/get-tenant.decorator';
import { UpdateStudentDto } from '../dto/update-student.dto';
import { UpdateStudentStatusDto } from '../dto/update-student-status.dto';
import { StudentQueryDto } from '../dto/student-query.dto';


@Controller('students')
export class StudentController {
    constructor(private readonly studentService: StudentService) {}

    @Get()
    findAll(@Tenant() tenant, @Query() query: StudentQueryDto) {
        return this.studentService.findAll(tenant.id, query);
    }

    @Get('statistics')
    getStatistics(@Tenant() tenant) {
        return this.studentService.getStatistics(tenant.id);
    }

    @Get(':publicId')
    findOne(@Tenant() tenant, @Param('publicId') publicId: string) {
        return this.studentService.findOne(tenant.id, publicId);
    }

    @Patch(':publicId')
    update(@Tenant() tenant, @Param('publicId') publicId: string, @Body() dto: UpdateStudentDto) {
        return this.studentService.update(tenant.id, publicId, dto);
    }

    @Patch(':publicId/status')
    updateStatus(@Tenant() tenant, @Param('publicId') publicId: string, @Body() dto: UpdateStudentStatusDto) {
        return this.studentService.updateStatus(tenant.id, publicId, dto);
    }
}