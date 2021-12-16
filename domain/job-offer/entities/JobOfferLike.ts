import { ID } from "../value-objects/jobOfferLikeID";

export class JobOfferLike{
    private _id!: ID;
    private _value: boolean = false;


	public get id(): ID{
		return this._id;
	  }
	public set id(value: ID) {
		this._id = value;
	}

	public get value(): boolean {
		return this._value;
	}
	public set value(value: boolean) {
		this._value = value;
	}

}