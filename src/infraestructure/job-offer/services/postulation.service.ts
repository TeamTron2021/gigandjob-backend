import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import FindJobOfferById from 'src/application/employeer/queries/findJobOfferByID.query';
import FindUserById from 'src/application/employeer/queries/findUserById.query';
import CreatePostulationCommand from 'src/application/job-offer/commands/createPostulation.command';
import FindPostulationsQuery from 'src/application/job-offer/queries/findPostulation.query';
import FindPostulationById from 'src/application/job-offer/queries/findPostulationById.query';
import { UserRepository } from 'src/modules/user/user.repository';
import UniqueId from 'src/shared/domain/UniqueUUID';
import CreatePostulationRequest from '../request/createPostulationRequies.request';
import { FindPostulationByIdRequest } from '../request/findPostulationById.request';

@Injectable()
export class PostulationService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly userRepository: UserRepository,
  ) {}

  async createPostulation(
    postulation: CreatePostulationRequest,
    _jobOffer: FindJobOfferById,
    _userId: FindUserById,
  ) {
    const id: string = _userId.userId;
    const jobOffer = await this.findJobOffer(_jobOffer.jobOffer);
    const user = await this.userRepository.get(id);
    const postulationId: string = new UniqueId().getId();
    const newPostulation = {
      ...postulation,
      id: postulationId,
    };

    return await this.commandBus.execute(
      new CreatePostulationCommand(newPostulation, jobOffer, user),
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

  async findJobOffer(id: string) {
    return await this.queryBus.execute(new FindJobOfferById(id));
  }
}
