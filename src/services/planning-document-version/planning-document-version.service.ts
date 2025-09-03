import {
  CreatePlanningDocumentVersionBodyDto,
  UpdatePlanningDocumentVersionBodyDto,
} from '@dto/planning-document-version.dto';
import { PlanningDocumentVersionEntity } from '@entities/planning-document-versions.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PlanningDocumentVersionService {
  constructor(
    @InjectRepository(PlanningDocumentVersionEntity)
    private readonly planningDocumentVersionRepo: Repository<PlanningDocumentVersionEntity>,
  ) {}

  create(data: CreatePlanningDocumentVersionBodyDto) {
    const planningDocumentVersion = this.planningDocumentVersionRepo.create(data);
    return this.planningDocumentVersionRepo.save(planningDocumentVersion);
  }

  update(id: number, data: UpdatePlanningDocumentVersionBodyDto) {
    return this.planningDocumentVersionRepo.update({ id: id }, data);
  }

  delete(id: number) {
    return this.planningDocumentVersionRepo.delete(id);
  }

  getPlanningDocumentVersionById(id: number) {
    return this.planningDocumentVersionRepo.findOne({ where: { id } });
  }
}
