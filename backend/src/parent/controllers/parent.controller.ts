import { Controller, Get, Param, Patch, Body, Query } from '@nestjs/common';
import { ParentService } from '../services/parent.service';
import { UpdateParentStatusDto } from '../dtos/update-parent-status.dto';
import { ParentQueryDto } from '../dtos/parent-query.dto';
import { UpdateParentDto } from '../dtos/update-parent.dto';
import { Tenant } from 'src/core/decorators/get-tenant.decorator';


@Controller('parents')
export class ParentController {
    constructor(private readonly parentService: ParentService) {}

    @Get()
    findAll(@Tenant() tenant, @Query() query: ParentQueryDto) {
        return this.parentService.findAll(tenant.id, query);
    }
    
    @Get('statistics')
    getStatistics(@Tenant() tenant) {
        return this.parentService.getStatistics(tenant.id);
    }

    @Get(':publicId')
    findOne(@Tenant() tenant, @Param('publicId') publicId: string) {
        return this.parentService.findOne(tenant.id, publicId);
    }
    
    @Patch(':publicId')
    update(@Tenant() tenant, @Param('publicId') publicId: string, @Body() dto: UpdateParentDto) {
        return this.parentService.update(tenant.id, publicId, dto);
    }

    @Patch(':publicId/status')
    updateStatus(@Tenant() tenant, @Param('publicId') publicId: string, @Body() dto: UpdateParentStatusDto) {
        return this.parentService.updateStatus(tenant.id, publicId, dto);
    }

    @Get(':publicId/students')
    getStudents(@Tenant() tenant, @Param('publicId') publicId: string) {
        return this.parentService.getStudents(tenant.id, publicId);
    }
}