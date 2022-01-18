import Interview from '../../job-offer/entities/Interview';
import { Postulation } from '../../job-offer/entities/postulation';
import { InterviewStatus } from '../../job-offer/shared/InterviewStatus.enum';
import { PostulationStatus } from '../../job-offer/value-objects/postulation/PostulationStatus';
import { UserStatus } from '../enums/UserStatus.enum';
import { UserID } from '../value_objects/UserID.value';

export class UserInterviewsReactivate {
  constructor(
    public Id: UserID,
    public status: UserStatus.Active,
    public postulacion: Postulation<PostulationStatus.passed>,
    public interviews: Interview<InterviewStatus.enable>,
  ) {}
}
