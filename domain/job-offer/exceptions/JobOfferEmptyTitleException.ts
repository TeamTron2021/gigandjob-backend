import { IException } from "../../../shared/domain/Iexception";

export default class JobOfferEmptyTitleException implements IException {
    public constructor(public readonly message: string) {}

    public showError(): string {
        return this.message;      
    }
}