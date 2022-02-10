import IAplicationService from 'src/application/shared/interfaces/IAplicationService';
import IGigRepository from '../repositories/gig.repository';

export default abstract class ICreateGigHandler {
  constructor(
    readonly gigRepository: IGigRepository,
    readonly createGigService: IAplicationService,
  ) {}
}
