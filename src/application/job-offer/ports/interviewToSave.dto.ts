import IDto from 'src/application/shared/interfaces/IDto';
import { InterviewStatus } from 'src/domain/job-offer/shared/InterviewStatus.enum';

export default class InterviewToSaveDto extends IDto {
  id: string;
  title: string;
  description: string;
  date: Date;
  status: InterviewStatus;
}
