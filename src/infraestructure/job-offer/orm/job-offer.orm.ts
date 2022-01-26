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
import { InterviewORM } from './interview.orm';
import { SkillsORM } from './skills.orm';

@Entity('joboffers')
export class JobOfferORM {
  @PrimaryColumn({ type: 'uuid' })
  id: string;
  @Column()
  description: string;
  @Column()
  salary: number;
  @Column()
  title: string;
  @Column()
  vacants: number;
  @Column()
  startDate: Date;
  @Column()
  finalDate: Date;
  @Column()
  status: string;
  @OneToMany(() => SkillsORM, (SkillsORM) => SkillsORM.jobOffer)
  skills: SkillsORM[];
  @OneToMany(() => InterviewORM, (InterviewORM) => InterviewORM.jobOffer)
  interviews: InterviewORM[];
  @ManyToOne(() => EmployeerORM, (EmployeerORM) => EmployeerORM.jobOffers)
  employeer: EmployeerORM;
  
  
}
