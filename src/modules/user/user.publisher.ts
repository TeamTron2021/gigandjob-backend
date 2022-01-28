import { Injectable } from '@nestjs/common';
import { UserEvent } from 'src/domain/user/User.aggregate';
import { UserPublisher as Publisher } from '../../application/user/User.publisher';

@Injectable()
export class UserPublisher implements Publisher {
  publish(events: UserEvent[]): void {}
}
