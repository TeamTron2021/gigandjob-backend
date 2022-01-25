
import { InterviewORM } from 'src/infraestructure/job-offer/orm/interview.orm';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';

@Entity('users')
export class UserORM {
  @PrimaryColumn({ type: 'uuid' })
  id: string;
  @Column()
  firstname: string;
  @Column()
  lastname: string;
  @Column()
  birthday: string;
  @Column()
  email: string;
  @Column()
  name: string;
  @Column()
  password: string;
  @Column()
  status: string;
  @Column()
  cv: string;
  @OneToMany(() => InterviewORM, (InterviewORM) => InterviewORM.interviewed)
  interviews: InterviewORM[];
}
