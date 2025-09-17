import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

/**
 * Mention entity matching Go model exactly
 */
@Entity('mentions')
export class Mention {
  @PrimaryColumn()
  id: string;

  @Column()
  content: string;

  @Column()
  userId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
