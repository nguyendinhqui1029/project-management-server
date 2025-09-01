import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Project } from "@entities/projects.entity";
import { User } from "@entities/users.entity";

@Entity('project_users')
export class ProjectUser {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Project, project => project.projectUsers)
  project!: Project;

  @ManyToOne(() => User, user => user.projectUsers)
  user!: User;

  @Column({ type: 'enum', enum: ['Admin', 'PM', 'Developer', 'Tester', 'User'], default: 'User' })
  roleInProject!: string;
}
