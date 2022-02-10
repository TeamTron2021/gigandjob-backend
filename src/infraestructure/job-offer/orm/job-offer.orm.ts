import { EmployeerORM } from 'src/infraestructure/employeer/orm/employeer.orm';
import { joboffercomplaintSchema } from 'src/infraestructure/jobOfferComplaint/orm/jobOfferComplaintOrm';
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

@Entity('joboffers')
export class JobOfferORM {
  @PrimaryColumn({ type: 'uuid' })
  id: string;
  @Column()
  description: string;
  @Column({})
  salary: number;
  @Column()
  title: string;
  @Column()
  vacants: number;
  @OneToMany(() => SkillsORM, (SkillsORM) => SkillsORM.jobOffer)
  skills: SkillsORM[];
  @Column()
  startDate: Date;
  @Column()
  finalDate: Date;
  @Column()
  status: string;
  @ManyToOne(() => EmployeerORM, (EmployeerORM) => EmployeerORM.jobOffers)
  employeer: EmployeerORM;
  @OneToMany(() => joboffercomplaintSchema,(ComplaintORM) => ComplaintORM.JobOffer, {nullable: true} )
  complaint: joboffercomplaintSchema;
}
