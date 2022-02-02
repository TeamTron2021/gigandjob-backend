import { Time } from 'src/domain/job-offer/shared/Time.enum';
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
import { SkillsORM } from './skills.orm';

@Entity('gigs')
export class GigORM {
  @PrimaryColumn({ type: 'uuid'})
  id: string;
  @Column()
  description: string;
  @Column({})
  salary: number;
  @Column()
  title: string;
  @Column()
  vacants: number;
  @OneToMany(() => SkillsORM, (SkillsORM) => SkillsORM.gig)
  skills: SkillsORM[];
  @Column()
  startDate: Date;
  @Column()
  finalDate: Date;
  @Column()
  status: string;
  @ManyToOne(() => EmployeerORM, (EmployeerORM) => EmployeerORM.gigs)
  employeer: EmployeerORM;
  @Column()
  time: Time;
  @Column()
  amount: number;
}
