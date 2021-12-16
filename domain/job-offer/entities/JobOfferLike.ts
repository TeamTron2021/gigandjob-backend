export class JobOfferLike{
    private _id!: string;
    private _value: boolean = false;


	public get id(): string {
		return this._id;
	  }
	public set id(value: string) {
		this._id = value;
	}

	public get value(): boolean {
		return this._value;
	}
	public set value(value: boolean) {
		this._value = value;
	}

}