import IDto from './IDto';

export default interface IAplicationService {
  execute(dto: IDto): IDto;
}
