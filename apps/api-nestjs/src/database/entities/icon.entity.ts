import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

/**
 * Icon entity matching Go model exactly
 */
@Entity('icons')
export class Icon {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  url: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
