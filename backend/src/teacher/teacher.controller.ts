import { Controller, Get, Post, Patch, Delete, Req, Query, Param, Body } from '@nestjs/common';
import { TeacherService } from './services/teacher.service';
import { TeacherQueryDto } from './dto/teacher-query.dto';
import { Tenant } from 'src/core/decorators/get-tenant.decorator';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { UpdateTeacherStatusDto } from './dto/update-teacher-status.dto';


@Controller('teachers')
export class TeacherController {
    constructor(private readonly teacherService: TeacherService) {}

    @Get()
    findAll(@Tenant() tenant, @Query() query: TeacherQueryDto) {
        return this.teacherService.findAll(tenant.id, query);
    }

    @Get(':publicId')
    findOne(@Tenant() tenant, @Param('publicId') publicId: string) {
        return this.teacherService.findOne(tenant.id, publicId);
    }

    @Patch(':publicId')
    update(@Tenant() tenant, @Param('publicId') publicId: string, @Body() dto: UpdateTeacherDto) {
        return this.teacherService.update(tenant.id, publicId, dto);
    }
    
    @Patch(':publicId/status')
    updateStatus(@Tenant() tenant, @Param('publicId') publicId: string, @Body() dto: UpdateTeacherStatusDto) {
        return this.teacherService.updateStatus(tenant.id, publicId, dto);
    }

    @Get('statistics')
    getStatistics(@Tenant() tenant) {
        return this.teacherService.getStatistics(tenant.id);
    }
}