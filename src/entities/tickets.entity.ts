import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { TicketBoard } from '@entities/ticket-board.entity';
import { Sprint } from '@entities/sprints.entity';
import { User } from '@entities/users.entity';

@Entity('tickets')
export class Ticket {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => TicketBoard, b => b.tickets)
  board!: TicketBoard;

  @ManyToOne(() => Sprint, s => s.tickets, { nullable: true })
  sprint!: Sprint;

  @Column()
  title!: string;

  @Column({ type: 'text', nullable: true })
  description!: string;

  @Column({ type: 'enum', enum: ['Task', 'Bug', 'Story'], default: 'Task' })
  type!: string;

  @Column({ type: 'enum', enum: ['Low', 'Medium', 'High', 'Critical'], default: 'Medium' })
  priority!: string;

  @Column({ type: 'enum', enum: ['Backlog', 'ToDo', 'InProgress', 'Review', 'Done'], default: 'Backlog' })
  status!: string;

  @ManyToOne(() => User, u => u.assignedTickets, { nullable: true })
  assignee!: User;

  @ManyToOne(() => User, u => u.reportedTickets)
  reporter!: User;

  @Column({ type: 'int', nullable: true })
  estimate!: number;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;
}
