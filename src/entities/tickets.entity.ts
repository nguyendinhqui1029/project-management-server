import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TicketBoardEntity } from '@entities/ticket-board.entity';
import { SprintEntity } from '@entities/sprints.entity';
import { UserEntity } from '@entities/users.entity';

@Entity('tickets')
export class TicketEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => TicketBoardEntity, (b) => b.tickets)
  board!: TicketBoardEntity;

  @ManyToOne(() => SprintEntity, (s) => s.tickets, { nullable: true })
  sprint?: SprintEntity;

  @Column()
  title!: string;

  @Column({ type: 'text', nullable: true })
  description!: string;

  @Column({
    type: 'enum',
    enum: [
      'Epic',
      'Defect',
      'Task',
      'DesignTask',
      'Improvement',
      'NewFeature',
      'Incident',
      'SubTask',
      'Question',
      'Problem',
      'DevelopmentTask',
      'Bug',
      'Story',
    ],
    default: 'Task',
  })
  type!: string;

  @Column({ type: 'enum', enum: ['Low', 'Medium', 'High', 'Critical'], default: 'Medium' })
  priority!: string;

  @Column({
    type: 'enum',
    enum: ['Backlog', 'ToDo', 'InProgress', 'Review', 'Done'],
    default: 'Backlog',
  })
  status!: string;

  @ManyToOne(() => UserEntity, (u) => u.assignedTickets, { nullable: true })
  assignee!: UserEntity;

  @ManyToOne(() => UserEntity, (u) => u.reportedTickets)
  reporter!: UserEntity;

  @Column({ type: 'int', nullable: true })
  estimate!: number;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;
}
