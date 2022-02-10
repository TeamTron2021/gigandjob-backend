
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
  date: Date; // FIXME: agregar fecha de inicio y fecha final.
  @ManyToOne(() => PostulationOrm, (PostulationOrm) => PostulationOrm.interviews)
  postulation: PostulationOrm;
  @Column()
  status: string;
}
