import IGigRepository from '../repositories/gig.repository';

export default abstract class ICreateGigHandler {
  constructor(readonly gigRepository: IGigRepository) {}
}
