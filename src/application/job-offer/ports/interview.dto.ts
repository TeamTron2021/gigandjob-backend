import IDto from 'src/application/shared/interfaces/IDto';

export default class InterviewDto extends IDto {
  id: string;
  title: string;
  description: string;
  date: Date;
}
