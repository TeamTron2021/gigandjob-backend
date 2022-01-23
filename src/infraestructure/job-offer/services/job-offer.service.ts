import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateJobOfferCommand } from 'src/application/job-offer/commands/createJobOffer.command';
import CreateJobOfferDto from 'src/application/job-offer/ports/createJobOffer.dto';
import UniqueId from 'src/shared/domain/UniqueUUID';
import createJobOfferRequestRequest from '../request/createJobOfferRequest.request';

@Injectable()
export class JobOfferService {
  constructor(private readonly commandBus: CommandBus) {}
  async createJobOffer(offer: createJobOfferRequestRequest) {
    const offerId: string = new UniqueId().getId();
    const newJobOffer: CreateJobOfferDto = {
      ...offer,
      id: offerId,
      skills: [...offer.skills],
    };
    this.commandBus.execute(new CreateJobOfferCommand(newJobOffer));
  }
}
