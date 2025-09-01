import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Sprint } from '@entities/sprints.entity';
import { RetroItem } from '@entities/retro-items.entity';

@Entity('retros')
export class Retro {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Sprint, (s) => s.retros)
  sprint!: Sprint;

  @Column({ type: 'text', nullable: true })
  summary?: string;

  @OneToMany(() => RetroItem, (item) => item.retro, { cascade: true })
  items!: RetroItem[];

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;
}
