import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

/**
 * Tag entity matching Go model exactly
 */
@Entity('tags')
export class Tag {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  color: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
