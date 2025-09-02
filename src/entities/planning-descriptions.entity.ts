import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PlanningDocumentEntity } from '@entities/planning-documents.entity';
import { UserEntity } from '@entities/users.entity';

@Entity('planning_descriptions')
export class PlanningDescriptionEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column({ type: 'json', nullable: true })
  rules!: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'json', nullable: true })
  messages?: string;

  @ManyToOne(() => UserEntity)
  createdBy!: UserEntity;

  @ManyToOne(() => UserEntity, { nullable: true })
  updatedBy!: UserEntity;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @ManyToMany(() => PlanningDocumentEntity, (doc) => doc.descriptions)
  documents!: PlanningDocumentEntity[];
}
