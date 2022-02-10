import IDto from 'src/application/shared/interfaces/IDto';
import { OfferStatus } from 'src/domain/job-offer/shared/OfferStatus.enum';
import { Time } from 'src/domain/job-offer/shared/Time.enum';
import { CreateSkillsDto } from './createSkills.dto';

export default class GigToSave extends IDto {
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
  status: OfferStatus;
}
