import IDto from 'src/application/shared/interfaces/IDto';
import { EmployeerStatus } from 'src/domain/employeer/shared/EmployeerStatus.enum';

export default class EmployeerToSaveDto extends IDto {
  id: string;
  companyName: string;
  companyMail: string;
  rif: string;
  latitude: string;
  longitude: string;
  industry: string;
  status: EmployeerStatus;
}
