import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Project } from '@entities/projects.entity';
import { Ticket } from '@entities/tickets.entity';

@Entity('ticket_boards')
export class TicketBoard {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Project, p => p.boards)
  project!: Project;

  @Column()
  name!: string;

  @OneToMany(() => Ticket, t => t.board)
  tickets!: Ticket[];

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;
}
