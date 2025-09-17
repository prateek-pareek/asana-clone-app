import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

/**
 * FileType entity matching Go model exactly
 */
@Entity('file_types')
export class FileType {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  extension: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
