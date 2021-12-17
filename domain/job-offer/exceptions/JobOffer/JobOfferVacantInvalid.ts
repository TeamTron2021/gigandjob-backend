import { IException } from "../../../../shared/domain/Iexception";

export default class JobOfferVacantInvalid implements IException {
    constructor(public readonly message: string) {}

    public showError(): string {
        return this.message;      
    }
}