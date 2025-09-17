import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

/**
 * Color entity matching Go model exactly
 */
@Entity('colors')
export class Color {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  color: string;

  @Column()
  hex: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
