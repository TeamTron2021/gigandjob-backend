import { CVEvents } from 'src/domain/user/entities/CV.entity';

export interface CVPublisher {
  publish(events: CVEvents[]): void;
}
