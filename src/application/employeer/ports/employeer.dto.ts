import IDto from 'src/application/shared/interfaces/IDto';

export default class EmployeerDto extends IDto {
  id: string;
  companyName: string;
  companyMail: string;
  rif: string;
  latitude: string;
  longitude: string;
  industry: string;
}
