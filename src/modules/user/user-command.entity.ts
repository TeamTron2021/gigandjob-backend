import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('users_command')
export class UserCommand extends BaseEntity {
  @PrimaryColumn()
  id: string;
  @Column()
  firstname: string;
  @Column()
  lastname: string;
  @Column()
  birthday: Date;
  @Column()
  email: string;
  @Column()
  password: string;
  @Column()
  status: string;
}
