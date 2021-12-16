import { IException } from "../../../../shared/domain/Iexception";

export default class JobOfferInvalidSalaryException implements IException {
    public constructor(public readonly message: string) {}

    public showError(): string {
        return this.message;      
    }
}