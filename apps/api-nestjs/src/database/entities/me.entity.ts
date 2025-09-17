import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

/**
 * Me entity matching Go model exactly
 */
@Entity('me')
export class Me {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  image: string;

  @Column()
  email: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
