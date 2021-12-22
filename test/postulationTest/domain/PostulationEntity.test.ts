import { PostulationCreated } from "../../../domain/job-offer/domain-events/postulation/PostulationCreated"
import PostulationRejected from "../../../domain/job-offer/domain-events/postulation/PostulationRejected"
import { Postulation } from "../../../domain/job-offer/entities/postulation"
import { PostulationDate } from "../../../domain/job-offer/value-objects/postulation/PostulationDate"
import { PostulationStatus } from "../../../domain/job-offer/value-objects/postulation/PostulationStatus"


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

    test('Should create a postulation and change its status',()=>{
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
        const postulationRejected = postulation.rejectPostulation(); 
        const postulationEventRejected = new PostulationRejected(
            postulationRejected.getId(), 
            postulationRejected.status
        )
        expect(postulationRejected.status).toBe(PostulationStatus.reject);
        expect(postulationRejected.getEvents()).toContainEqual(postulationEventRejected);
    })

})