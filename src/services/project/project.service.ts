import { CreateProjectRequestBodyDto, UpdateProjectRequestBodyDto } from '@dto/project.dto';
import { ProjectEntity } from '@entities/projects.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(ProjectEntity)
    private readonly projectRepo: Repository<ProjectEntity>,
  ) {}

  create(data: CreateProjectRequestBodyDto) {
    const project = this.projectRepo.create(data);
    return this.projectRepo.save(project);
  }

  update(id: number, data: UpdateProjectRequestBodyDto) {
    return this.projectRepo.update({ id: id }, data);
  }

  delete(id: number) {
    return this.projectRepo.delete(id);
  }

  getProjectById(id: number) {
    return this.projectRepo.findOne({ where: { id } });
  }

  getAllProjects() {
    return this.projectRepo.find();
  }
}
