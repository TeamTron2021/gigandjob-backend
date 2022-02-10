import { PostulationDateEmpty } from '../../domain/job-offer/exceptions/postulation/PostulationDateEmpty';
import { PostulationDate } from '../../domain/job-offer/value-objects/postulation/PostulationDate';

describe('Postulation Date test ', () => {
  test('Should return a error: PostulationBirthdayEmpty', () => {
    const date: any = null;
    expect(() => new PostulationDate(date)).toThrowError(
      new PostulationDateEmpty(),
    );
  }),
    test('Should return a correct Date test object', () => {
      const date: Date = new Date();
      expect(new PostulationDate(date)).toBeInstanceOf(PostulationDate);
    });
});
