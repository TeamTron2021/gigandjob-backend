import IDomainEvent from '../../../../shared/domain/IDomainEvent';
import { PostulationStatus } from '../../value-objects/postulation/PostulationStatus';
import { PostulationUUID } from '../../value-objects/postulation/PostulationUUID';

export default class PostulationRejected implements IDomainEvent {
  constructor(public id: PostulationUUID, public status: PostulationStatus) {}
}
