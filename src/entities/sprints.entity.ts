import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Project } from '@entities/projects.entity';
import { Ticket } from '@entities/tickets.entity';
import { Retro } from '@entities/retros.entity';

@Entity('sprints')
export class Sprint {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Project, p => p.sprints)
  project!: Project;

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

  @OneToMany(() => Ticket, t => t.sprint)
  tickets!: Ticket[];

  @OneToMany(() => Retro, r => r.sprint)
  retros!: Retro[];
}
