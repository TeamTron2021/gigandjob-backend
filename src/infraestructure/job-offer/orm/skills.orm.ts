import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('skills')
export class SkillsORM {
  @PrimaryColumn({ type: 'uuid' })
  id: string;
  @Column()
  skill: string;
}
