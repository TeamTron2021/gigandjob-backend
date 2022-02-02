import IDto from 'src/application/shared/interfaces/IDto';
import { OfferStatus } from 'src/domain/job-offer/shared/OfferStatus.enum';
import { CreateSkillsDto } from './createSkills.dto';

export default class JobOfferToSave extends IDto {
  id: string;
  description: string;
  salary: number;
  skills: CreateSkillsDto[];
  title: string;
  vacant: number;
  startDate: Date;
  finalDate: Date;
  status: OfferStatus;
}
