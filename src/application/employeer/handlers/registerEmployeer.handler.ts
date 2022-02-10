import IAplicationService from 'src/application/shared/interfaces/IAplicationService';
import IEmployeerRepository from '../repositories/employeer.repository';

export default abstract class IRegisterEmployeerHandler {
  constructor(
    readonly employeerRepository: IEmployeerRepository,
    readonly employeerService: IAplicationService,
  ) {}
}
