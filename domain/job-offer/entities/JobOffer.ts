import { JobOfferLike } from "./JobOfferLike";

export class jobOffer{
    //private _id: string;
    //private title: string;
    //private dataRange: Date;
    //private description: string;
    //private salary: number;
    //private skills: string;
    //private vacants: number;
    private _likes!: JobOfferLike;
    //private ispublished:boolean;
    //private isSuspended: boolean;
    //private complaints: string;
    

	//constructor(id: string, title: string, dataRange: Date, description: string, salary: number, skills: string, 
  //      vacants: number, ispublished: boolean, isSuspended: boolean, complaints: string) {
	//	this._id = id;
	//	this.title = title;
	//	this.dataRange = dataRange;
	//	this.description = description;
	//	this.salary = salary;
	//	this.skills = skills;
	//	this.vacants = vacants;
	//	this.ispublished = ispublished;
	//	this.isSuspended = isSuspended;
	//	this.complaints = complaints;
	//}

    public get likes(): JobOfferLike {
        return this._likes;
      }
      public set likes(value: JobOfferLike) {
        this._likes = value;
      }

//Nota: Recuerda revisar porque obligatoriamente se necesita que el !
}
