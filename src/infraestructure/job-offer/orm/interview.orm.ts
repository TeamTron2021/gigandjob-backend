import { EmployeerORM } from 'src/infraestructure/employeer/orm/employeer.orm';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';


@Entity('interviews')
export class InterviewORM {
  @PrimaryColumn({ type: 'uuid' })
  id: string;
  @Column()
  title: string;
  @Column()
  description: string;
  @Column()
  date: Date;
  @ManyToOne(() => EmployeerORM, (EmployeerORM) => EmployeerORM.interviews)
  interviewed: EmployeerORM;
  @ManyToOne(() => EmployeerORM, (EmployeerORM) => EmployeerORM.interviews)
  interviewer: EmployeerORM;
  @Column()
  status: string;
}
