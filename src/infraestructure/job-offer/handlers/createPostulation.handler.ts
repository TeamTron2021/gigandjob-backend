import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import CreatePostulationCommand from 'src/application/job-offer/commands/createPostulation.command';
import PostulationFound from 'src/application/job-offer/ports/findPostulationResult.dto';
import PostulationRepository from '../repositories/postulationRepository.repository';

@CommandHandler(CreatePostulationCommand)
export class CreatePostulationHandler
  implements ICommandHandler<CreatePostulationCommand>
{
  constructor(private readonly postulationRepostory: PostulationRepository) {}

  async execute(command: CreatePostulationCommand): Promise<PostulationFound> {
    return await this.postulationRepostory.createPostulation(
      command.postulation,
      command.jobOffer.id,
      command.userId,
    );
  }
}
