import IEmployeerRepository from '../repositories/employeer.repository';

export default abstract class IFindEmployeers {
  constructor(readonly employeerRepository: IEmployeerRepository) {}
}
