import EmployeerFound from 'src/application/employeer/ports/findEmployeerResult.dto';
import Employeer from 'src/domain/employeer/entities/Employeer.aggregate';
import CreateJobOfferDto from '../ports/createJobOffer.dto';

export class CreateJobOfferCommand {
  constructor(
    public readonly jobOffer: CreateJobOfferDto,
    public readonly employeer: EmployeerFound,
  ) {}
}
