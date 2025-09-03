import {
  CreatePlanningDescriptionBodyDto,
  UpdatePlanningDescriptionBodyDto,
} from '@dto/planning-descriptions.dto';
import {
  CreatePlanningDocumentVersionBodyDto,
  UpdatePlanningDocumentVersionBodyDto,
} from '@dto/planning-document-version.dto';
import {
  CreatePlanningDocumentBodyDto,
  UpdatePlanningDocumentBodyDto,
} from '@dto/planning-document.dto';
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { PlanningDescriptionsService } from '@services/planning-descriptions/planning-descriptions.service';
import { PlanningDocumentVersionService } from '@services/planning-document-version/planning-document-version.service';
import { PlanningDocumentService } from '@services/planning-document/planning-document.service';

@Controller('planning-document')
export class PlanningDocumentController {
  constructor(
    private readonly planningDocumentService: PlanningDocumentService,
    private readonly planningDocumentDescriptionService: PlanningDescriptionsService,
    private readonly planningDocumentVersionService: PlanningDocumentVersionService,
  ) {}

  @Post()
  createPlanningDocument(@Body() body: CreatePlanningDocumentBodyDto) {
    return this.planningDocumentService.create(body);
  }

  @Put('/:id')
  updatePlanningDocument(@Param('id') id: number, @Body() body: UpdatePlanningDocumentBodyDto) {
    return this.planningDocumentService.update(id, body);
  }

  @Delete('/:id')
  deletePlanningDocument(@Param('id') id: number) {
    return this.planningDocumentService.delete(id);
  }

  @Get('/:id')
  getPlanningDocument(@Param('id') id: number) {
    return this.planningDocumentService.getPlanningDocumentById(id);
  }

  @Post('description')
  createPlanningDocumentDescription(@Body() body: CreatePlanningDescriptionBodyDto) {
    return this.planningDocumentDescriptionService.create(body);
  }

  @Put('description/:id')
  updatePlanningDocumentDescription(
    @Param('id') id: number,
    @Body() body: UpdatePlanningDescriptionBodyDto,
  ) {
    return this.planningDocumentDescriptionService.update(id, body);
  }

  @Delete('description/:id')
  deletePlanningDocumentDescription(@Param('id') id: number) {
    return this.planningDocumentDescriptionService.delete(id);
  }

  @Get('description/:id')
  getPlanningDocumentDescription(@Param('id') id: number) {
    return this.planningDocumentDescriptionService.getPlanningDocumentDescriptionById(id);
  }

  @Post('version')
  createPlanningDocumentVersion(@Body() body: CreatePlanningDocumentVersionBodyDto) {
    return this.planningDocumentVersionService.create(body);
  }

  @Put('version/:id')
  updatePlanningDocumentVersion(
    @Param('id') id: number,
    @Body() body: UpdatePlanningDocumentVersionBodyDto,
  ) {
    return this.planningDocumentVersionService.update(id, body);
  }

  @Delete('version/:id')
  deletePlanningDocumentVersion(@Param('id') id: number) {
    return this.planningDocumentVersionService.delete(id);
  }

  @Get('version/:id')
  getPlanningDocumentVersion(@Param('id') id: number) {
    return this.planningDocumentVersionService.getPlanningDocumentVersionById(id);
  }
}
