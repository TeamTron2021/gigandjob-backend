import UniqueId from "../../../shared/domain/UniqueUUID";

export abstract class ChangeInterviewStatus{
    constructor() {}

    abstract changeStatus(idInterview: UniqueId): void;
}