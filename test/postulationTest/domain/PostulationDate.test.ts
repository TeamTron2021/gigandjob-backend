import { PostulationDateEmpty } from '../../../domain/job-offer/entities/postulation/exceptions/PostulationDateEmpty'
import { PostulationDate } from '../../../domain/job-offer/entities/postulation/value-objects/PostulationDate'

describe('Postulation Date test ', () => {
    test('Postulation Date empty', () => {
        let date: any = null
        expect(()=> new PostulationDate(date)).toThrowError(new PostulationDateEmpty())
    }),

    test('Postulation date test object', () => {
        let date: Date = new Date()
        expect(new PostulationDate(date)).toBeInstanceOf(PostulationDate)
    })

})  