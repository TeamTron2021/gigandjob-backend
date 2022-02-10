import EmployeerFound from 'src/application/employeer/ports/findEmployeerResult.dto';
import CreateGigDto from '../ports/createGig.dto';
import GigToSave from '../ports/gigToSave.dto';

export default interface IGigRepository {
  createGig(createGigDto: GigToSave, employeer: EmployeerFound): Promise<void>;
}
