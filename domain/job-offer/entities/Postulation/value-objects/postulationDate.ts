import { PostulationDateEmpty } from "../exceptions/PostulationDateEmpty"

export class PostulationDate {
	public readonly postulationDate: Date

	constructor (date: Date) {
        if (!date) throw new PostulationDateEmpty()
        this.postulationDate = this.date
    }
    

    get date(): Date {
        return this.postulationDate
    }
}