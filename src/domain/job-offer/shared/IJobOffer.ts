import { Postulation } from '../entities/postulation';
import { PostulationStatus } from '../value-objects/postulation/PostulationStatus';

export default interface IJobOffer {
  getPostulations(): Postulation<PostulationStatus>[];
  addPostulation(postulation: Postulation<PostulationStatus>): void;
}
