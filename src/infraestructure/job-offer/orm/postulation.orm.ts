import { Column, Entity, PrimaryColumn, OneToMany, ManyToOne } from 'typeorm';
import { InterviewORM } from './interview.orm';
import { JobOfferORM } from './job-offer.orm';

@Entity('postulation')
export default class PostulationOrm {
  @PrimaryColumn({ type: 'uuid' })
  id: string;
  @Column()
  date: Date;
  @Column()
  status: string;
  @Column()
  user: string;
  @OneToMany(() => InterviewORM, (InterviewORM) => InterviewORM.postulation)
  interviews: InterviewORM[];
  @ManyToOne(() => JobOfferORM, (jobOfferORM) => jobOfferORM.postulations)
  jobOffer: JobOfferORM;
}
