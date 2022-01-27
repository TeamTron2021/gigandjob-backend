import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import FindJobOfferById from 'src/application/employeer/queries/findJobOfferByID.query';
import CreatePostulationCommand from 'src/application/job-offer/commands/createPostulation.command';
import CreatePostulationDTO from 'src/application/job-offer/ports/createPostulation.dto';
import { FindJobOfferByIdRequest } from 'src/infraestructure/employeer/request/findJobOfferByID.request';
import UniqueId from 'src/shared/domain/UniqueUUID';
import CreatePostulationRequest from '../request/createPostulationRequies.request';

@Injectable()
export class PostulationService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  async createPostulation(
    postulation: CreatePostulationRequest,
    offer: FindJobOfferByIdRequest,
  ) {
    const postulationId: string = new UniqueId().getId();
    const newPostulation: CreatePostulationDTO = {
      ...postulation,
      id: postulationId,
    };

    const jobOffer = await this.queryBus.execute(
      new FindJobOfferById(offer.id),
    );

    return await this.commandBus.execute(
      new CreatePostulationCommand(newPostulation, jobOffer),
    );
  }
}
