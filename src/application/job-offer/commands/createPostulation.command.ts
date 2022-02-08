import CreatePostulationDTO from '../ports/createPostulation.dto';

export default class CreatePostulationCommand {
  constructor(public readonly postulation: CreatePostulationDTO) {}
}
