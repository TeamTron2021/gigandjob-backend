import IPostulationRepository from '../repositories/postulation.repository';

export default abstract class IFindPostulations {
  constructor(readonly postulationRepository: IPostulationRepository) {}
}
