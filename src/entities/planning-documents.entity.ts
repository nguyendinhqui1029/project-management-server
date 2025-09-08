import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { ProjectEntity } from '@entities/projects.entity';
import { UserEntity } from '@entities/users.entity';
import { PlanningDocumentVersionEntity } from '@entities/planning-document-versions.entity';
import { PlanningDescriptionEntity } from '@entities/planning-descriptions.entity';

@Entity('planning_documents')
export class PlanningDocumentEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => ProjectEntity, (p) => p.planningDocuments, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'projectId' })
  project!: ProjectEntity;

  @Column()
  title!: string;

  @ManyToOne(() => UserEntity)
  createdBy!: UserEntity;

  @ManyToOne(() => UserEntity)
  updatedBy?: UserEntity;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @OneToMany(() => PlanningDocumentVersionEntity, (v) => v.document, { cascade: true })
  versions?: PlanningDocumentVersionEntity[];

  @ManyToMany(() => PlanningDescriptionEntity, (d) => d.documents, { cascade: true })
  @JoinTable({
    name: 'planning_document_descriptions',
    joinColumn: { name: 'planning_document_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'description_id', referencedColumnName: 'id' },
  })
  descriptions?: PlanningDescriptionEntity[];
}
