import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import EmployeerFound from 'src/application/employeer/ports/findEmployeerResult.dto';
import FindEmployeerById from 'src/application/employeer/queries/findEmployeerById.query';
import CreateGigCommand from 'src/application/job-offer/commands/createGig.command';
import { CreateJobOfferCommand } from 'src/application/job-offer/commands/createJobOffer.command';
import CreateGigDto from 'src/application/job-offer/ports/createGig.dto';
import CreateJobOfferDto from 'src/application/job-offer/ports/createJobOffer.dto';
import JobOfferFound from 'src/application/job-offer/ports/jobOfferFound.dto';
import FindOfferByIdQuery from 'src/application/job-offer/queries/findJobOfferById.query';
import JobOffersQuery from 'src/application/job-offer/queries/findJobOffers.query';
import { FindEmployeerByIdRequest } from 'src/infraestructure/employeer/request/findEmployeerById.request';
import UniqueId from 'src/shared/domain/UniqueUUID';
import createGigRequest from '../request/createGigRequest.request';
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
    const Employeer = await this.findEmployeer(employeer.id);
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

  async createGig(gig: createGigRequest, employeer: FindEmployeerByIdRequest) {
    const Employeer = await this.findEmployeer(employeer.id);
    const gigId: string = new UniqueId().getId();
    const newGig: CreateGigDto = {
      ...gig,
      id: gigId,
      skills: [...gig.skills],
    };
    return await this.commandBus.execute(
      new CreateGigCommand(newGig, Employeer),
    );
  }

  async findEmployeer(id: string): Promise<EmployeerFound> {
    return await await this.queryBus.execute(new FindEmployeerById(id));
  }

  async findJobOffers(): Promise<JobOfferFound[]> {
    return await this.queryBus.execute(new JobOffersQuery());
  }
  async findJobOfferById(id: FindEmployeerByIdRequest): Promise<JobOfferFound> {
    return await this.queryBus.execute(new FindOfferByIdQuery(id.id));
  }
}
