import { Column, Entity, PrimaryColumn, OneToMany } from 'typeorm';
import { InterviewORM } from './interview.orm';

@Entity('postulation')
export default class PostulationOrm {
  @PrimaryColumn({ type: 'uuid' })
  id: string;
  @Column()
  date: Date;
  @Column()
  status: string;
  @OneToMany(() => InterviewORM, (InterviewORM) => InterviewORM.postulation)
  interviews: InterviewORM[];
  @Column()
  jobOfferId: string;
  @Column({ nullable: true })
  userId: string;
}
