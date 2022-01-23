import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
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
  @Column()
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
}
