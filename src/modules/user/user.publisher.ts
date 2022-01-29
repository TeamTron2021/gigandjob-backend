import { Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { UserEvent } from 'src/domain/user/User.aggregate';
import { UserPublisher as Publisher } from '../../application/user/User.publisher';

@Injectable()
export class UserPublisher implements Publisher {
  constructor(private eventBus: EventBus) {}
  publish(events: UserEvent[]): void {
    this.eventBus.publishAll(events);
  }
}
