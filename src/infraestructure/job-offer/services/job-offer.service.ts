import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import FindEmployeerById from 'src/application/employeer/queries/findEmployeerById.query';
import { CreateJobOfferCommand } from 'src/application/job-offer/commands/createJobOffer.command';
import CreateJobOfferDto from 'src/application/job-offer/ports/createJobOffer.dto';
import { FindEmployeerByIdRequest } from 'src/infraestructure/employeer/request/findEmployeerById.request';
import UniqueId from 'src/shared/domain/UniqueUUID';
import createJobOfferRequestRequest from '../request/createJobOfferRequest.request';

@Injectable()
export class JobOfferService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}
  async createJobOffer(
    offer: createJobOfferRequestRequest,
    employeer: FindEmployeerByIdRequest,
  ) {
    const Employeer = await this.queryBus.execute(
      new FindEmployeerById(employeer.id),
    );
    const offerId: string = new UniqueId().getId();
    const newJobOffer: CreateJobOfferDto = {
      ...offer,
      id: offerId,
      skills: [...offer.skills],
    };
    return await this.commandBus.execute(
      new CreateJobOfferCommand(newJobOffer, Employeer),
    );
  }
}
