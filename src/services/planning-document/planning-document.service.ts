import { CreatePlanningDocumentBodyDto } from '@dto/planning-document.dto';
import { PlanningDocumentEntity } from '@entities/planning-documents.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PlanningDocumentService {
    constructor(
      @InjectRepository(PlanningDocumentEntity)
      private readonly planningDocumentEntityRepo: Repository<PlanningDocumentEntity>,
    ) {}
  
    create(data: CreatePlanningDocumentBodyDto) {
      const product = this.planningDocumentEntityRepo.create(data);
      return this.planningDocumentEntityRepo.save(product);
    }

    update(id:number, data: CreatePlanningDocumentBodyDto) {
      return this.planningDocumentEntityRepo.update({ id: id }, data);
    }
  
    delete(id: number) {
      return this.planningDocumentEntityRepo.delete(id);
    }

    async getPlanningDocumentById(id: number) {
     const result = this.planningDocumentEntityRepo.findOne({
      where: { id }, 
      relations: ['createdBy', 'updatedBy', 'project', 'descriptions', 'versions']
    });
    return result
  }
}

