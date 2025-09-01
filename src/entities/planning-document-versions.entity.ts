import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PlanningDocument } from '@entities/planning-documents.entity';
import { User } from '@entities/users.entity';

@Entity('planning_document_versions')
export class PlanningDocumentVersion {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => PlanningDocument, (doc) => doc.versions)
  document!: PlanningDocument;

  @Column()
  versionNumber!: string;

  @Column({ type: 'json' })
  content!: string;

  @ManyToOne(() => User)
  createdBy!: User;

  @ManyToOne(() => User, { nullable: true })
  updatedBy?: User;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;
}
