import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { ProjectEntity } from '@entities/projects.entity';
import { TicketEntity } from '@entities/tickets.entity';

@Entity('ticket_boards')
export class TicketBoardEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => ProjectEntity, (p) => p.boards, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'projectId' })
  project!: ProjectEntity;

  @Column()
  name!: string;

  @Column()
  isDefault!: boolean;

  @OneToMany(() => TicketEntity, (t) => t.board)
  tickets?: TicketEntity[];

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;
}
