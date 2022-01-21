import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('employeers')
export class EmployeerORM {
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @Column()
  companyName: string;

  @Column()
  companyMail: string;

  @Column()
  rif: string;

  @Column()
  latitude: string;

  @Column()
  longitude: string;

  @Column()
  industry: string;

  @Column()
  status: string;
}
