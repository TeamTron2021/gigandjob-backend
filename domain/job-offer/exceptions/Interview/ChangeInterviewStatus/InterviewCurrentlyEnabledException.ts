import { IException } from "../../../../../shared/domain/Iexception";

export default class InterviewCurrentlyEnabledException extends Error implements IException {
	constructor(public readonly message: string) {
		super(message);
	}
	
	showError(): string {
		return this.message;
	}
}