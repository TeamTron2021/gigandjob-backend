import { Time } from 'src/domain/job-offer/shared/Time.enum';
import { CreateSkillsDto } from './createSkills.dto';

export default class CreateGigDto {
  id: string;
  description: string;
  salary: number;
  skills: CreateSkillsDto[];
  title: string;
  vacant: number;
  startDate: Date;
  finalDate: Date;
  time: Time;
  amount: number;
}
