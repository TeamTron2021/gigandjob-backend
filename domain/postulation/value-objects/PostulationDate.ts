import { IValueObject } from '../../../shared/domain/IValueObject'

export class PostulationDate implements IValueObject {

    private postulationDate: Date

    constructor (date: Date) {
        this.postulationDate = date
    }

    get date(): Date {
        return this.postulationDate
    }

    set date(postulationDate: Date) {
        this.postulationDate = postulationDate
    }

    equals(valueObject: IValueObject): boolean {
        return true
    }    

}