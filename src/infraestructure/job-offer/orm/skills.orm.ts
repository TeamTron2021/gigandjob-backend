import JobOffer from 'src/domain/job-offer/entities/JobOffer.aggregate';
import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { JobOfferORM } from './job-offer.orm';

@Entity('skills')
export class SkillsORM {
  @PrimaryColumn({ type: 'uuid' })
  id: string;
  @Column()
  skill: string;
  @ManyToOne(() => JobOfferORM, (JobOfferORM) => JobOfferORM.skills)
  jobOffer: JobOfferORM;
}
