import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { PlanningDocumentEntity } from '@entities/planning-documents.entity';
import { UserEntity } from '@entities/users.entity';

@Entity('planning_document_versions')
export class PlanningDocumentVersionEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => PlanningDocumentEntity, (doc) => doc.versions, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'documentId' })
  document!: PlanningDocumentEntity;

  @Column()
  version!: string;

  @Column({ type: 'json' })
  content!: string;

  @ManyToOne(() => UserEntity)
  createdBy!: UserEntity;

  @ManyToOne(() => UserEntity, { nullable: true })
  updatedBy?: UserEntity;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;
}
