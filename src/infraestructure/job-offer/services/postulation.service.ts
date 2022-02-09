import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import FindJobOfferById from 'src/application/employeer/queries/findJobOfferByID.query';
import CreatePostulationCommand from 'src/application/job-offer/commands/createPostulation.command';
import CreatePostulationDTO from 'src/application/job-offer/ports/createPostulation.dto';
import FindPostulationsQuery from 'src/application/job-offer/queries/findPostulation.query';
import FindPostulationById from 'src/application/job-offer/queries/findPostulationById.query';
import { FindJobOfferByIdRequest } from 'src/infraestructure/employeer/request/findJobOfferByID.request';
import UniqueId from 'src/shared/domain/UniqueUUID';
import CreatePostulationRequest from '../request/createPostulationRequies.request';
import { FindPostulationByIdRequest } from '../request/findPostulationById.request';

@Injectable()
export class PostulationService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  async createPostulation(postulation: CreatePostulationRequest) {
    const postulationId: string = new UniqueId().getId();
    const newPostulation = {
      ...postulation,
      id: postulationId,
    };

    return await this.commandBus.execute(
      new CreatePostulationCommand(newPostulation),
    );
  }
  async findPostulationById(postulationId: FindPostulationByIdRequest) {
    const postulation = await this.queryBus.execute(
      new FindPostulationById(postulationId.id),
    );
    return postulation;
  }
  async findPostulations() {
    return await this.queryBus.execute(new FindPostulationsQuery());
  }
}
