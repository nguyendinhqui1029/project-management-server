import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToMany } from 'typeorm';
import { ProjectUser } from '@entities/project-users.entity';
import { Ticket } from '@entities/tickets.entity';
import { Meeting } from '@entities/meeting.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  username!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  passwordHash!: string;

  @Column()
  fullName!: string;

  @Column({ type: 'enum', enum: ['Admin', 'PM', 'BE', 'FE', 'QA', 'Viewer'], default: 'Viewer' })
  role!: string;

  @Column({ type: 'enum', enum: ['Active', 'Inactive'], default: 'Active' })
  status!: string;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @OneToMany(() => ProjectUser, pu => pu.user)
  projectUsers: ProjectUser[] = [];

  @OneToMany(() => Ticket, t => t.assignee)
  assignedTickets: Ticket[] =[];

  @OneToMany(() => Ticket, t => t.reporter)
  reportedTickets: Ticket[] =[];

  @OneToMany(() => Meeting, m => m.participants)
  meetings: Meeting[] = [];
}
