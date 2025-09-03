import {
  CreatePlanningDescriptionBodyDto,
  UpdatePlanningDescriptionBodyDto,
} from '@dto/planning-descriptions.dto';
import { PlanningDescriptionEntity } from '@entities/planning-descriptions.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PlanningDescriptionsService {
  constructor(
    @InjectRepository(PlanningDescriptionEntity)
    private readonly planningDescriptionRepo: Repository<PlanningDescriptionEntity>,
  ) {}

  create(data: CreatePlanningDescriptionBodyDto) {
    const product = this.planningDescriptionRepo.create(data);
    return this.planningDescriptionRepo.save(product);
  }

  update(id: number, data: UpdatePlanningDescriptionBodyDto) {
    return this.planningDescriptionRepo.update({ id: id }, data);
  }

  delete(id: number) {
    return this.planningDescriptionRepo.delete(id);
  }

  getPlanningDocumentDescriptionById(id: number) {
    return this.planningDescriptionRepo.findOne({ where: { id } });
  }
}
