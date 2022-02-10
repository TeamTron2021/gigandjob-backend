import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('admin')
export default class AdminORM {
  @PrimaryColumn({ type: 'uuid' })
  id: string;
  @Column()
  email: string;
  @Column()
  password: string;
}