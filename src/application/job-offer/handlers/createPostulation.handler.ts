import IAplicationService from 'src/application/shared/interfaces/IAplicationService';
import IPostulationRepository from '../repositories/postulation.repository';

export default abstract class ICreatePostulationHandler {
  constructor(
    readonly postulationRepository: IPostulationRepository,
    readonly createPostulationService: IAplicationService,
  ) {}
}
