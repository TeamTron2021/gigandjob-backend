import IEmployeerRepository from '../repositories/employeer.repository';

export default abstract class IRegisterEmployeerHandler {
  constructor(readonly employeerRepository: IEmployeerRepository) {}
}
