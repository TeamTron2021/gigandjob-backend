import { CVService } from './CV.service';

export interface CVCommand {
  execute(service: CVService): void;
}
