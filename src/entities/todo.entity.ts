import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TicketEntity } from '@entities/tickets.entity';

@Entity('todos')
export class TodoEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'enum', enum: ['Pending', 'InProgress', 'Done'], default: 'Pending' })
  status!: string;

  @Column({ type: 'int', default: 0 })
  percent!: number;

  @Column({ type: 'text', nullable: true })
  description!: string;

  @ManyToOne(() => TicketEntity, (ticket) => ticket.todos, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'ticketId' })
  ticket!: TicketEntity;
}
