import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn } from 'typeorm';
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
  @ManyToMany(() => SkillsORM)
  @JoinTable()
  skills: SkillsORM[];
  @Column()
  startDate: Date;
  @Column()
  finalDate: Date;
}
