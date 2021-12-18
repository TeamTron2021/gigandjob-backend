import { PostulationUUIDError } from "../../../domain/job-offer/entities/postulation/exceptions/PostulationUUIDError"
import { PostulationUUID } from "../../../domain/job-offer/entities/postulation/value-objects/PostulationUUID"
import { v4 as uuidv4 } from "uuid";

describe('Postulation UUID Tests', () => {
    test('Postulation UUDI Error', () => {
        const uuid: any = null
        expect(() => new PostulationUUID(uuid)).toThrowError(new PostulationUUIDError)
    }),

    test('Postulation UUID Correct', () => {
        const uuid: string = uuidv4()
        expect(new PostulationUUID(uuid)).toBeInstanceOf(PostulationUUID)
    }
    )

})