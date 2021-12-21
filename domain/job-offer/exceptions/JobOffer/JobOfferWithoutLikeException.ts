import { IException } from "../../../interview/exceptions/I-exception";

export default class JobOfferWithoutLikeException extends Error implements IException {
    constructor(public readonly message: string) {
        super(message);
    }

    public showError(): string {
        return this.message;      
    }
}