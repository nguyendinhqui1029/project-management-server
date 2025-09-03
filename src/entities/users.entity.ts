import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToMany,
  BeforeInsert,
} from 'typeorm';
import { TicketEntity } from '@entities/tickets.entity';
import { MeetingEntity } from '@entities/meeting.entity';
import { ProjectEntity } from '@entities/projects.entity';
import * as bcrypt from 'bcryptjs';
@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  username!: string;

  @Column({ unique: true })
  email!: string;

  @Column({ select: false })
  password!: string;

  @BeforeInsert()
  async hashPassword(): Promise<void> {
    this.password = await bcrypt.hash(this.password, 10);
  }

  @Column()
  fullName!: string;

  @Column({ nullable: true })
  avatar!: string;

  @Column({ type: 'enum', enum: ['Admin', 'PM', 'BE', 'FE', 'QA', 'Viewer'], default: 'Viewer' })
  role!: string;

  @Column({ type: 'enum', enum: ['Active', 'Inactive'], default: 'Active' })
  status!: string;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @OneToMany(() => ProjectEntity, (project) => project.owner)
  ownedProjects?: ProjectEntity[];

  // Quan hệ N-N: user tham gia project
  @ManyToMany(() => ProjectEntity, (project) => project.participants)
  participatingProjects?: ProjectEntity[];

  @OneToMany(() => TicketEntity, (t) => t.assignee)
  assignedTickets?: TicketEntity[];

  @OneToMany(() => TicketEntity, (t) => t.reporter)
  reportedTickets?: TicketEntity[];

  @OneToMany(() => MeetingEntity, (m) => m.participants)
  meetings?: MeetingEntity[];
}
