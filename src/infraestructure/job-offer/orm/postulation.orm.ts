import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('postulation')
export default class PostulationOrm {
  @PrimaryColumn({ type: 'uuid' })
  id: string;
  @Column()
  date: Date;
  @Column()
  status: string;
}
