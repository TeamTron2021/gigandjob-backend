import EmployeerDto from '../../application/ports/employeer.dto';
import RegisterEmployeerRequest from '../request/registerEmployeer.request';

export default class RegisterEmployeerMapper {
  public static convertRegisterEmployeerRequestToDTO(
    id: string,
    employeer: RegisterEmployeerRequest,
  ): EmployeerDto {
    const employeerDto: EmployeerDto = {
      id: id,
      ...employeer,
    };
    return employeerDto;
  }
}
