import EmployeerDto from '../ports/employeer.dto';

export class RegisterEmployeerCommand {
  constructor(public readonly employeer: EmployeerDto) {}
}
