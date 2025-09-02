import { CreatePlanningDocumentBodyDto } from '@dto/planning-document.dto';
import { PlanningDocumentEntity } from '@entities/planning-documents.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PlanningDocumentService {
    constructor(
      @InjectRepository(PlanningDocumentEntity)
      private readonly userRepo: Repository<PlanningDocumentEntity>,
    ) {}
  
    create(data: CreatePlanningDocumentBodyDto) {
      const product = this.userRepo.create(data);
      return this.userRepo.save(product);
    }

    update(id:number, data: CreatePlanningDocumentBodyDto) {
      return this.userRepo.update({ id: id }, data);
    }
  
    delete(id: number) {
      return this.userRepo.delete(id);
    }
    
    getUserById(id: number) {
     return this.userRepo.findOne({where: { id }});
    }
}

