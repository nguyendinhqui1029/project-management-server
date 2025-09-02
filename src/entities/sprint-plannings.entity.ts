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
import { SprintEntity } from '@entities/sprints.entity';
import { UserEntity } from '@entities/users.entity';
import { TicketEntity } from '@entities/tickets.entity';

@Entity('sprint_plannings')
export class SprintPlanningEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => SprintEntity, (s) => s.id, { onDelete: 'CASCADE' })
  sprint!: SprintEntity;

  @Column({ type: 'text', nullable: true })
  notes?: string;

  @ManyToMany(() => TicketEntity, { cascade: true })
  @JoinTable({
    name: 'sprint_planning_ticket_items',
    joinColumn: { name: 'sprint_planning_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'ticket_id', referencedColumnName: 'id' },
  })
  ticketItems!: TicketEntity[];

  @ManyToOne(() => UserEntity)
  createdBy!: UserEntity;

  @ManyToOne(() => UserEntity)
  updatedBy?: UserEntity;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;
}
