import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { ProjectEntity } from '@entities/projects.entity';
import { TicketEntity } from '@entities/tickets.entity';
import { SprintRetroEntity } from '@entities/sprint-retros.entity';

@Entity('sprints')
export class SprintEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => ProjectEntity, (p) => p.sprints, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'projectId' })
  project!: ProjectEntity;

  @Column()
  name!: string;

  @Column({ type: 'text', nullable: true })
  goal!: string;

  @Column()
  startDate!: Date;

  @Column()
  endDate!: Date;

  @Column({ type: 'enum', enum: ['Planned', 'Active', 'Completed'], default: 'Planned' })
  status!: string;

  @OneToMany(() => TicketEntity, (t) => t.sprint)
  tickets!: TicketEntity[];

  @OneToMany(() => SprintRetroEntity, (r) => r.sprint)
  retros!: SprintRetroEntity[];
}
