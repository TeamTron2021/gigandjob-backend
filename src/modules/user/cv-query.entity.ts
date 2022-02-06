import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

type CVQueryData = {
    academicFormation: string[];
    skills: string[];
    courses: string[];
    status: number;
  };
  
  @Entity('cvs_query')
  export class CVQueryEntity extends BaseEntity {
    @PrimaryColumn()
    id: string;
    @Column({ type: 'json' })
    data: CVQueryData;
  }
  