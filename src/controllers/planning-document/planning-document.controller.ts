import { CreatePlanningDocumentBodyDto, UpdatePlanningDocumentBodyDto } from '@dto/planning-document.dto';
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { PlanningDocumentService } from '@services/planning-document/planning-document.service';

@Controller('planning-document')
export class PlanningDocumentController {
    constructor(private readonly planningDocumentService: PlanningDocumentService) {}
  
    @Post()
    createUser(@Body() body: CreatePlanningDocumentBodyDto) {
      return this.planningDocumentService.create(body);
    }
  
    @Put(':id')
    updateUser(@Param('id') id: number, @Body() body: UpdatePlanningDocumentBodyDto) {
      return this.planningDocumentService.update(id, body);
    }
  
    @Delete(':id')
    deleteUser(@Param('id') id: number) {
      return this.planningDocumentService.delete(id);
    }
  
    @Get(':id')
    getUser(@Param('id') id: number) {
      return this.planningDocumentService.getUserById(id);
    }

}
