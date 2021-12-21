import Interview from "../../../domain/interview/entities/Interview"
import { InterviewStatus } from "../../../domain/interview/shared/InterviewStatus.enum"
import { PostulationCreated } from "../../../domain/job-offer/entities/postulation/domain-events/PostulationCreated"
import { Postulation } from "../../../domain/job-offer/entities/postulation/postulation"
import { PostulationDate } from "../../../domain/job-offer/entities/postulation/value-objects/PostulationDate"
import { PostulationStatus } from "../../../domain/job-offer/entities/postulation/value-objects/PostulationStatus"

describe('Postulation Entity test', () => {
    test('Should create a postulation entity with isSend status', () => {
        const postulation = Postulation.create(
            new PostulationDate(new Date())
        )
        expect(postulation).toBeInstanceOf(Postulation)
        
        const eventCreated = new PostulationCreated(
            postulation.getId(),
            postulation.getDate(),
            postulation.status
        )
        expect(eventCreated).toBeInstanceOf(PostulationCreated)
        expect(postulation.getEvents()).toContainEqual(eventCreated)
        expect(postulation.status).toEqual(PostulationStatus.isSend)
        expect(postulation.getInterviews()).toBe(undefined)
    })

})