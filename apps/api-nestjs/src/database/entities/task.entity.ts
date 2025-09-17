import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';

/**
 * Task entity matching Go model exactly
 */
@Entity('tasks')
export class Task {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column('json')
  description: Record<string, any>;

  @Column()
  taskParentId: string;

  @Column()
  taskPriorityId: string;

  @Column()
  assigneeId: string;

  @Column()
  createdBy: string;

  @Column()
  completed: boolean;

  @Column()
  completedAt: string;

  @Column()
  isNew: boolean;

  @Column()
  dueDate: string;

  @Column()
  dueTime: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relations
  @ManyToOne(() => Task, task => task.subTasks)
  @JoinColumn({ name: 'taskParentId' })
  parentTask?: Task;

  @OneToMany(() => Task, task => task.parentTask)
  subTasks: Task[];
}
