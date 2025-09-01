import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Retro } from '@entities/retros.entity';

export type RetroItemStatus = 'Approve' | 'Reject';
export type RetroItemType = 'WentWell' | 'ToImprove';

@Entity('retro_items')
export class RetroItem {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => Retro, (retro) => retro.items, { onDelete: 'CASCADE' })
  retro!: Retro;

  @Column({ type: 'enum', enum: ['WentWell', 'ToImprove'] })
  type!: RetroItemType;

  @Column({ type: 'text' })
  content!: string;

  @Column({ type: 'enum', enum: ['Approve', 'Reject'], default: 'Approve' })
  status!: RetroItemStatus;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;
}
