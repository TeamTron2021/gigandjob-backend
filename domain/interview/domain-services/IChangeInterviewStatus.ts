import {DomainService} from "../../../shared/domain/DomainService";
import {InterviewStatus} from "../shared/InterviewStatus.enum";

export abstract class IChangeInterviewStatus implements DomainService{
    constructor() {}

    abstract changeStatus(interviewStatus: InterviewStatus): InterviewStatus;
}