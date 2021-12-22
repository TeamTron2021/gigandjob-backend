import { PostulationDateEmpty } from '../../domain/job-offer/entities/Postulation/exceptions/PostulationDateEmpty'
import { PostulationDate } from '../../domain/job-offer/entities/Postulation/value-objects/postulationDate'

describe('Postulation Date test ', () => {
    test('Should return a error: PostulationBirthdayEmpty', () => {
        let date: any = null
        expect(()=> new PostulationDate(date)).toThrowError(new PostulationDateEmpty())
    }),

    test('Should return a correct Date test object', () => {
        let date: Date = new Date()
        expect(new PostulationDate(date)).toBeInstanceOf(PostulationDate)
    })

})  

