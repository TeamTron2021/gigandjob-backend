import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('cvs_command')
export class CVCommandEntity extends BaseEntity {
  @PrimaryColumn()
  id: string;
  @Column()
  academicFormation: string[];
  @Column()
  skills: string[];
  @Column()
  courses: string[];
  @Column()
  status: number;
}
