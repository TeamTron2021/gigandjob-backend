export default class CreateJobOfferDto {
  id: string;
  description: string;
  salary: number;
  skills: string[];
  title: string;
  vacant: number;
  startDate: Date;
  finalDate: Date;
}
