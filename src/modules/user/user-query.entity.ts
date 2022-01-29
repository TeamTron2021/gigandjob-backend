import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';
import { UserCommandEntity } from './user-command.entity';

type UserQueryData = {
  firstname: string;
  lastname: string;
  birthday: Date;
  email: string;
  status: number;
};

@Entity('users_query')
export class UserQueryEntity extends BaseEntity {
  @PrimaryColumn()
  id: string;
  @Column({ type: 'json' })
  data: UserQueryData;
}
