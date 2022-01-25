import { InterviewORM } from 'src/infraestructure/job-offer/orm/interview.orm';
import { JobOfferORM } from 'src/infraestructure/job-offer/orm/job-offer.orm';
import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';

@Entity('employeers')
export class EmployeerORM {
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @Column()
  companyName: string;

  @Column()
  companyMail: string;

  @Column({ unique: true })
  rif: string;

  @Column()
  latitude: string;

  @Column()
  longitude: string;

  @Column()
  industry: string;

  @Column()
  status: string;

  @OneToMany(() => JobOfferORM, (JobOfferORM) => JobOfferORM.employeer)
  jobOffers: JobOfferORM[];


}
