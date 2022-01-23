import CreateJobOfferDto from '../ports/createJobOffer.dto';

export class CreateJobOfferCommand {
  constructor(public readonly jobOffer: CreateJobOfferDto) {}
}
