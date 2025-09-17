import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

/**
 * Activity entity matching Go model exactly
 */
@Entity('activities')
export class Activity {
  @PrimaryColumn()
  id: string;

  @Column()
  type: string;

  @Column()
  content: string;

  @Column()
  userId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
