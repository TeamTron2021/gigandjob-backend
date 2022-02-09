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
  @ManyToOne(
    () => PostulationOrm,
    (PostulationOrm) => PostulationOrm.interviews,
  )
  postulation: PostulationOrm;
  @Column()
  status: string;
}
