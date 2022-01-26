import EmployeerFound from 'src/application/employeer/ports/findEmployeerResult.dto';
import CreateJobOfferDto from '../ports/createJobOffer.dto';

export class CreateJobOfferCommand {
  constructor(
    public readonly jobOffer: CreateJobOfferDto,
    public readonly employeer: EmployeerFound,
  ) {}
}
