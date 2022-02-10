import IDto from 'src/application/shared/interfaces/IDto';
import { PostulationStatus } from 'src/domain/job-offer/value-objects/postulation/PostulationStatus';
import { CreateSkillsDto } from './createSkills.dto';

export default class PostulationToSave extends IDto {
  id: string;
  date: Date;
  status: PostulationStatus;
}
