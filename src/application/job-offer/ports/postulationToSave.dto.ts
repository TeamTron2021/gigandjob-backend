import IDto from 'src/application/shared/interfaces/IDto';

export default class PostulationToSave extends IDto {
  id: string;
  date: Date;
  status: string;
}
