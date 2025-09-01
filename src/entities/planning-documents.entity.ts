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
} from 'typeorm';
import { Project } from '@entities/projects.entity';
import { User } from '@entities/users.entity';
import { PlanningDocumentVersion } from '@entities/planning-document-versions.entity';
import { PlanningDescription } from '@entities/planning-descriptions.entity';

@Entity('planning_documents')
export class PlanningDocument {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Project, (p) => p.planningDocuments)
  project!: Project;

  @Column()
  title!: string;

  @ManyToOne(() => User)
  createdBy!: User;

  @ManyToOne(() => User)
  updatedBy?: User;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;
  
  @OneToMany(() => PlanningDocumentVersion, (v) => v.document, { cascade: true })
  versions!: PlanningDocumentVersion[];

  @ManyToMany(() => PlanningDescription, (d) => d.documents, { cascade: true })
  @JoinTable({
    name: 'planning_document_descriptions',
    joinColumn: { name: 'planning_document_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'description_id', referencedColumnName: 'id' },
  })
  descriptions!: PlanningDescription[];
}
