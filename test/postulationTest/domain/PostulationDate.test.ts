import { PostulationDateEmpty } from '../../../src/domain/job-offer/exceptions/postulation/PostulationDateEmpty';
import { PostulationDate } from '../../../src/domain/job-offer/value-objects/postulation/PostulationDate';

describe('Postulation Date test ', () => {
  test('Postulation Date empty', () => {
    const date: any = null;
    expect(() => new PostulationDate(date)).toThrowError(
      new PostulationDateEmpty(),
    );
  }),
    test('Postulation date test object', () => {
      const date: Date = new Date();
      expect(new PostulationDate(date)).toBeInstanceOf(PostulationDate);
    });
});
