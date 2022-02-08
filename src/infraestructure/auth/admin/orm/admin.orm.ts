import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('admin')
export default class {
  @PrimaryColumn({ type: 'uuid' })
  id: string;
  @Column()
  email: string;
  @Column()
  password: string;
}
