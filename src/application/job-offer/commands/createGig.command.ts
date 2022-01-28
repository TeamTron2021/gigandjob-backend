import EmployeerFound from 'src/application/employeer/ports/findEmployeerResult.dto';
import CreateGigDto from '../ports/createGig.dto';

export default class CreateGigCommand {
  constructor(
    public readonly gig: CreateGigDto,
    public readonly employeer: EmployeerFound,
  ) {}
}
