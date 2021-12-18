import { PostulationDateEmpty } from "../exceptions/PostulationDateEmpty"

export const CURRENT_DATE_FORMAT = 'DD-MM-YYY'
export class PostulationDate  {

    private readonly postulationDate: Date

    constructor (date: Date) {
        if (!date) throw new PostulationDateEmpty()
        this.postulationDate = this.date
    }

    get date(): Date {
        return this.postulationDate
    }

}