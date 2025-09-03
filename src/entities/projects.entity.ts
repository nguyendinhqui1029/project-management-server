import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  ManyToMany,
  JoinTable,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from '@entities/users.entity';
import { PlanningDocumentEntity } from '@entities/planning-documents.entity';
import { TicketBoardEntity } from '@entities/ticket-board.entity';
import { SprintEntity } from '@entities/sprints.entity';
import { MeetingEntity } from '@entities/meeting.entity';
import { IsNumber, Max, Min } from 'class-validator';

@Entity('projects')
export class ProjectEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'date', nullable: true })
  startDate!: Date;

  @Column({ type: 'date', nullable: true })
  endDate?: Date;

  @Column({
    type: 'enum',
    enum: ['Initiating', 'OnTrack', 'AtRisk', 'Delayed', 'Pending', 'Completed'],
    default: 'Initiating',
  })
  status!: string;

  @Column({ nullable: false, default: 0 })
  @IsNumber({}, { message: 'Project progress must be a number' })
  @Min(0, { message: 'Project progress must be at least 0' })
  @Max(100, { message: 'Project progress must be at most 100' })
  projectProgress?: number;

  @ManyToOne(() => UserEntity)
  owner!: UserEntity;

  @ManyToOne(() => UserEntity)
  updatedBy?: UserEntity;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @ManyToMany(() => UserEntity, { cascade: true })
  @JoinTable({
    name: 'project_participants', // tên bảng trung gian
    joinColumn: { name: 'project_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'user_id', referencedColumnName: 'id' },
  })
  participants?: UserEntity[];

  @OneToMany(() => PlanningDocumentEntity, (pd) => pd.project)
  planningDocuments?: PlanningDocumentEntity[];

  @OneToMany(() => TicketBoardEntity, (tb) => tb.project)
  boards?: TicketBoardEntity[];

  @OneToMany(() => SprintEntity, (s) => s.project)
  sprints?: SprintEntity[];

  @OneToMany(() => MeetingEntity, (m) => m.project)
  meetings?: MeetingEntity[];
}
