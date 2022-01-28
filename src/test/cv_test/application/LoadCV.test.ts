import { LoadCV } from 'src/application/user/commands/LoadCV.command';
import { CVLoaded } from 'src/domain/user/domain_events/CVLoaded.event';
import { CVPublisher } from 'src/application/user/CV.publisher';
import { CVRepository } from 'src/application/user/CV.reporsitory';
import { CVService } from 'src/application/user/CV.service';

describe('Load User', () => {
  const mockPublishFn = jest.fn();
  const publisher: CVPublisher = {
    publish: mockPublishFn,
  };
  let repository: CVRepository;
  const service: CVService = new CVService(repository, publisher);

  test('Should load cv', () => {
    const command: LoadCV = new LoadCV('UCAB', 'SQL', 'Word');

    command.execute(service);
    expect(mockPublishFn.mock.calls[0][0][0]).toBeInstanceOf(CVLoaded);
  });
});
