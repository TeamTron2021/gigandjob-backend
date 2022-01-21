import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('employeers')
export class EmployeerORM {
  @PrimaryColumn({ type: 'uuid' })
  uuid: string;

  @Column()
  name: string;
}
