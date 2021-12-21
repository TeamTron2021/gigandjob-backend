import { IException } from "../../../../shared/domain/Iexception";

export default class InterviewMissingDateException extends Error implements IException {
    public constructor(public readonly message: string) {
        super(message);
    }

    public showError(): string {
        return this.message;      
    }
}