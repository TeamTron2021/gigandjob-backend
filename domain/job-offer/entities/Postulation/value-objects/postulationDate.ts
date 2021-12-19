import { PostulationDateEmpty } from "../../exceptions/Postulation/PostulationDateEmpty"

export class PotulationDate {
	public readonly postulationDate: Date

	constructor (date: Date) {
        if (!date) throw new PostulationDateEmpty()
        this.postulationDate = this.date
    }

    get date(): Date {
        return this.postulationDate
    }
}