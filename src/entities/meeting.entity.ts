import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Project } from '@entities/projects.entity';
import { User } from '@entities/users.entity';

@Entity('meetings')
export class Meeting {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Project, (p) => p.meetings)
  project!: Project;

  @Column()
  title!: string;

  @Column({ type: 'timestamp' })
  startTime!: Date;

  @Column({ type: 'timestamp' })
  endTime!: Date;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ nullable: true })
  roomName!: string;

  @Column({ type: 'text', nullable: true })
  meetingNotes?: string;

  @ManyToOne(() => User)
  createdBy!: User;

  @ManyToMany(() => User, { cascade: true })
  @JoinTable({
    name: 'meeting_participants',
    joinColumn: { name: 'meeting_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'user_id', referencedColumnName: 'id' },
  })
  participants!: User[];

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;
}
