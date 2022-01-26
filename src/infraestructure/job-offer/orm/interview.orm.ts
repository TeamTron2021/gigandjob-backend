
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { JobOfferORM } from './job-offer.orm';
import { UserORM } from 'src/infraestructure/user/orm/user.orm';


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
  
  @ManyToOne(() => JobOfferORM, (JobOfferORM) => JobOfferORM.interviews)
  jobOffer: JobOfferORM;
  @Column()
  status: string;
}
