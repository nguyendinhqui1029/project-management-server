import { CreateProjectRequestBodyDto, UpdateProjectRequestBodyDto } from '@dto/project.dto';
import { ProjectEntity } from '@entities/projects.entity';
import { UserEntity } from '@entities/users.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(ProjectEntity)
    private readonly projectRepo: Repository<ProjectEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
  ) {}

  create(data: CreateProjectRequestBodyDto) {
    const project = this.projectRepo.create(data);
    return this.projectRepo.save(project);
  }

  async update(id: number, data: UpdateProjectRequestBodyDto) {
    const project = await this.projectRepo.findOne({
      where: { id },
      relations: ['participants'],
    });
    if (!project) {
      return;
    }
    const userIds = data.participants?.map((user) => user.id) ?? [];
    const users = await this.userRepo.findBy({
      id: In(userIds),
    });
    project.participants = users;
    project.name = data.name;
    project.description = data.description;
    project.startDate = new Date(data.startDate);
    project.endDate = new Date(data.endDate);
    project.isUnlimited = data.isUnlimited;
    return this.projectRepo.save(project);
  }

  delete(id: number) {
    return this.projectRepo.delete(id);
  }

  getProjectById(id: number) {
    return this.projectRepo.findOne({
      where: { id },
      relations: [
        'owner',
        'sprints',
        'meetings',
        'participants',
        'boards',
        'boards.tickets',
        'boards.tickets.assignee',
        'boards.tickets.reporter',
        'planningDocuments',
      ],
    });
  }

  getAllProjects() {
    return this.projectRepo.find({
      relations: ['owner', 'sprints', 'meetings', 'participants'],
    });
  }
}
