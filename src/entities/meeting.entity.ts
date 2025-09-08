import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { ProjectEntity } from '@entities/projects.entity';
import { UserEntity } from '@entities/users.entity';

@Entity('meetings')
export class MeetingEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => ProjectEntity, (p) => p.meetings, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'projectId' })
  project!: ProjectEntity;

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

  @ManyToOne(() => UserEntity)
  createdBy!: UserEntity;

  @ManyToMany(() => UserEntity, { cascade: true })
  @JoinTable({
    name: 'meeting_participants',
    joinColumn: { name: 'meeting_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'user_id', referencedColumnName: 'id' },
  })
  participants!: UserEntity[];

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;
}
