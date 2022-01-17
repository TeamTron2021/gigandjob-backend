import IDomainEvent from '../../../../../shared/domain/IDomainEvent';
import { OfferStatus } from '../../../shared/OfferStatus.enum';
import JobOfferId from '../../../value-objects/JobOffer/JobOfferId';

export default class JobOfferPublished implements IDomainEvent {
  constructor(public Id: JobOfferId, public status: OfferStatus) {}
}
