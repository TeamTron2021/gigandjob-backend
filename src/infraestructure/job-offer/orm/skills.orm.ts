import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { GigORM } from './gig.orm';
import { JobOfferORM } from './job-offer.orm';

@Entity('skills')
export class SkillsORM {
  @PrimaryColumn({ type: 'uuid' })
  id: string;
  @Column()
  skill: string;
  @ManyToOne(() => JobOfferORM, (JobOfferORM) => JobOfferORM.skills, {
    nullable: true,
  })
  jobOffer: JobOfferORM;
  @ManyToOne(() => GigORM, (GigORM) => GigORM.skills, { nullable: true })
  gig: GigORM;
}
