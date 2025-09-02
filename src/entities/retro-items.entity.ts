import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { SprintRetroEntity } from '@entities/sprint-retros.entity';

export type RetroItemStatus = 'Approve' | 'Reject';
export type RetroItemType = 'WentWell' | 'ToImprove';

@Entity('retro_items')
export class RetroItemEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => SprintRetroEntity, (retro) => retro.items, { onDelete: 'CASCADE' })
  retro!: SprintRetroEntity;

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
