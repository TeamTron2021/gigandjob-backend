import IAplicationService from 'src/application/shared/interfaces/IAplicationService';
import { PostulationService } from 'src/infraestructure/job-offer/services/postulation.service';
import IPostulationRepository from '../repositories/postulation.repository';

export default abstract class IRegisterPostulationHandler {
  constructor(
    readonly postulationRepository: IPostulationRepository,
    readonly postulationService: IAplicationService,
  ) {}
}
