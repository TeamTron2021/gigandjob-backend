

export default class NotificationEmptyContentException extends Error  {
    constructor(public readonly message: string) {
        super(message);
    }

    public showError(): string {
        return this.message;      
    }
}