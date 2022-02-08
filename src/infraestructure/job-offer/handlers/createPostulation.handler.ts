import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import CreatePostulationCommand from 'src/application/job-offer/commands/createPostulation.command';
import IRegisterPostulationHandler from 'src/application/job-offer/handlers/registerPostulation.handler';
import PostulationToSave from 'src/application/job-offer/ports/postulationToSave.dto';
import CreatePostulationService from 'src/application/job-offer/services/createPostulation.service';
import PostulationRepository from '../repositories/postulationRepository.repository';
import { PostulationService } from '../services/postulation.service';

@CommandHandler(CreatePostulationCommand)
export class CreatePostulationHandler
  extends IRegisterPostulationHandler
  implements ICommandHandler<CreatePostulationCommand>
{
  constructor(
    readonly postulationRepostory: PostulationRepository,
    readonly postulationService: CreatePostulationService,
  ) {
    super(postulationRepostory, postulationService);
  }

  async execute(command: CreatePostulationCommand): Promise<void> {
    const postulation: PostulationToSave = this.postulationService.execute(
      command.postulation,
    );
    return this.postulationRepository.createPostulation(postulation);
  }
}
