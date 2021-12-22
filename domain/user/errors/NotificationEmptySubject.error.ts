

export default class NotificationEmptySubjectException extends Error  {
    constructor(public readonly message: string) {
        super(message);
    }

    public showError(): string {
        return this.message;      
    }
}