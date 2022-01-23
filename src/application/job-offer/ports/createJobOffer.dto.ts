import { CreateSkillsDto } from './createSkills.dto';

export default class CreateJobOfferDto {
  id: string;
  description: string;
  salary: number;
  skills: CreateSkillsDto[];
  title: string;
  vacant: number;
  startDate: Date;
  finalDate: Date;
}
