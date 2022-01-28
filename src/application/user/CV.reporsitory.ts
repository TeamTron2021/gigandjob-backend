import { CVDto } from './CV.dto';

export interface CVRepository {
  get(uuid: string): Promise<CVDto>;
}
