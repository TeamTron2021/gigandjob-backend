import Interview from "../entities/Interview";
import {DomainService} from "../../../shared/domain/DomainService";

export abstract class IChangeInterviewStatus implements DomainService{
    constructor() {}

    abstract changeStatus(interview: Interview<any>): void;
}