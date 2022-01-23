import { v4 as uuidv4 } from 'uuid';
import { PostulationUUIDError } from '../../../src/domain/job-offer/exceptions/postulation/PostulationUUIDError';
import { PostulationUUID } from '../../../src/domain/job-offer/value-objects/postulation/PostulationUUID';

describe('Postulation UUID Tests', () => {
  test('Postulation UUDI Error', () => {
    const uuid: any = null;
    expect(() => new PostulationUUID(uuid)).toThrowError(
      new PostulationUUIDError(),
    );
  }),
    test('Postulation UUID Correct', () => {
      const uuid: string = uuidv4();
      expect(new PostulationUUID(uuid)).toBeInstanceOf(PostulationUUID);
    });
});
