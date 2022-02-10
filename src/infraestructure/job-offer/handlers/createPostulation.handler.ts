import { ConflictException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import CreatePostulationCommand from 'src/application/job-offer/commands/createPostulation.command';
import ICreatePostulationHandler from 'src/application/job-offer/handlers/createPostulation.handler';
import PostulationToSave from 'src/application/job-offer/ports/postulationToSave.dto';
import CreatePostulationService from 'src/application/job-offer/services/createPostulation.service';
import { OfferStatus } from 'src/domain/job-offer/shared/OfferStatus.enum';
import PostulationRepository from '../repositories/postulationRepository.repository';


@CommandHandler(CreatePostulationCommand)
export class CreatePostulationHandler
  extends ICreatePostulationHandler
  implements ICommandHandler<CreatePostulationCommand>
{
  constructor(
    readonly postulationRepository: PostulationRepository,
    readonly createPostulationService: CreatePostulationService,
  ) {
    super(postulationRepository, createPostulationService);
  }


  
  async execute(command: CreatePostulationCommand): Promise<void> {
    const postulationTosave: PostulationToSave = this.createPostulationService.execute(
      command.postulation,
    );
    if (command.jobOffer.status === OfferStatus.disable) {
      return this.postulationRepository.createPostulation(
        postulationTosave,
        command.jobOffer,
      );
    }
    throw new ConflictException(
      'El empleador esta suspendido, por lo tanto no puede crear ofertas',
    );
  }
}
