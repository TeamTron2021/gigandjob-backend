import { PostulationDate } from '../../value-objects/postulation/PostulationDate';
import { PostulationStatus } from '../../value-objects/postulation/PostulationStatus';
import { PostulationUUID } from '../../value-objects/postulation/PostulationUUID';

export class PostulationUpdatedStatus {
  constructor(
    public id: PostulationUUID,
    public date: PostulationDate,
    public status: PostulationStatus,
  ) {}
}
