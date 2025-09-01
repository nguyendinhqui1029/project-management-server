import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn } from 'typeorm';
import { User } from '@entities/users.entity';
import { ProjectUser } from '@entities/project-users.entity';
import { PlanningDocument } from '@entities/planning-documents.entity';
import { TicketBoard } from '@entities/ticket-board.entity';
import { Sprint } from '@entities/sprints.entity';
import { Meeting } from '@entities/meeting.entity';

@Entity('projects')
export class Project {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'date', nullable: true })
  startDate?: Date;

  @Column({ type: 'date', nullable: true })
  endDate?: Date;

  @Column({ type: 'enum', enum: ['Initiating', 'OnTrack', 'AtRisk', 'Delayed', 'Pending', 'Completed'], default: 'Initiating' })
  status!: string;

  @ManyToOne(() => User)
  owner!: User;

  @CreateDateColumn()
  createdAt?: Date;

  @OneToMany(() => ProjectUser, pu => pu.project)
  projectUsers: ProjectUser[] = [];

  @OneToMany(() => PlanningDocument, pd => pd.project)
  planningDocuments: PlanningDocument[] = [];

  @OneToMany(() => TicketBoard, tb => tb.project)
  boards: TicketBoard[] = [];

  @OneToMany(() => Sprint, s => s.project)
  sprints: Sprint[] = [];

  @OneToMany(() => Meeting, m => m.project)
  meetings: Meeting[] = [];
}
