import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { SprintEntity } from '@entities/sprints.entity';
import { RetroItemEntity } from '@entities/retro-items.entity';

@Entity('retros')
export class SprintRetroEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => SprintEntity, (s) => s.retros)
  sprint!: SprintEntity;

  @Column({ type: 'text', nullable: true })
  summary?: string;

  @OneToMany(() => RetroItemEntity, (item) => item.retro, { cascade: true })
  items!: RetroItemEntity[];

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;
}
