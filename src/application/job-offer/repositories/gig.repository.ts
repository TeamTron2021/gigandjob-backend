import EmployeerFound from 'src/application/employeer/ports/findEmployeerResult.dto';
import CreateGigDto from '../ports/createGig.dto';

export default interface IGigRepository {
  createGig(
    createGigDto: CreateGigDto,
    employeer: EmployeerFound,
  ): Promise<void>;
}
