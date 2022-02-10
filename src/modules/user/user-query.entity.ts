import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

type UserQueryData = {
  firstname: string;
  lastname: string;
  birthday: Date;
  email: string;
  password: string;
  status: number;
};

@Entity('users_query')
export class UserQueryEntity extends BaseEntity {
  @PrimaryColumn()
  id: string;
  @Column({ type: 'json' })
  data: UserQueryData;
  @Column()
  status: number;
}
