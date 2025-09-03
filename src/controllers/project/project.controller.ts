import { CreateProjectRequestBodyDto, UpdateProjectRequestBodyDto } from '@dto/project.dto';
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ProjectService } from '@services/project/project.service';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  createTicketBoard(@Body() body: CreateProjectRequestBodyDto) {
    return this.projectService.create(body);
  }

  @Put('/:id')
  updateTicketBoard(@Param('id') id: number, @Body() body: UpdateProjectRequestBodyDto) {
    return this.projectService.update(id, body);
  }

  @Delete('/:id')
  deleteTicketBoard(@Param('id') id: number) {
    return this.projectService.delete(id);
  }

  @Get('/:id')
  getProjectById(@Param('id') id: number) {
    return this.projectService.getProjectById(id);
  }

  @Get()
  getAllProjects() {
    return this.projectService.getAllProjects();
  }
}
