import { LoadCV } from '../../../application/user/commands/LoadCV.command';
import { CVLoaded } from '../../../domain/user/domain_events/CVLoaded.event';
import { CVPublisher } from '../../../application/user/CV.publisher';
import { CVRepository } from '../../../application/user/CV.reporsitory';
import { CVService } from '../../../application/user/CV.service';

describe('Load User', () => {
  const mockPublishFn = jest.fn();
  const publisher: CVPublisher = {
    publish: mockPublishFn,
  };
  let repository: CVRepository;
  const service: CVService = new CVService(repository, publisher);

  test('Should load cv', () => {
    const command: LoadCV = new LoadCV(
      ['SQL', 'Mongo', 'Inteligencia emocional'],
      ['Excel', 'Word', 'Powerpoint'],
      ['Primaria', 'Bachiller', 'Universitario'],
    );

    command.execute(service);
    expect(mockPublishFn.mock.calls[0][0][0]).toBeInstanceOf(CVLoaded);
  });
});
