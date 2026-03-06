import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { status, priority } from './tasks.enums';

@Entity({ name: 'tasks' })
export default class TasksEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: false })
  title: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ nullable: false, type: 'enum', enum: status })

  status: status;

  @Column({
    type: 'enum',
    enum: priority,
    nullable: false,
  })
  priority: priority;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
