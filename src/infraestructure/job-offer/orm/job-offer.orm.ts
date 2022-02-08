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
import PostulationOrm from './postulation.orm';
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
  @OneToMany(() => PostulationOrm, (PostulationOrm) => PostulationOrm.jobOffer)
  postulations: PostulationOrm[];
}
