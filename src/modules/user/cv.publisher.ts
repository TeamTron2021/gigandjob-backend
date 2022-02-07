import { CVEvents } from 'src/domain/user/entities/CV.entity';
import { Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { CVPublisher as Publisher } from '../../application/user/CV.publisher';


@Injectable()
export class CVPublisher implements Publisher {
  constructor(private eventBus: EventBus) {}
  publish(events: CVEvents[]): void {
    this.eventBus.publishAll(events);
  }
}