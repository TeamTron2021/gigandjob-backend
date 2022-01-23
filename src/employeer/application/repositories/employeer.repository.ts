import Employeer from 'src/domain/employeer/entities/Employeer.aggregate';
import { EmployeerStatus } from 'src/domain/employeer/shared/EmployeerStatus.enum';
import EmployeerDto from '../ports/employeer.dto';
import EmployeerFound from '../ports/findEmployeerResult.dto';

export default interface IEmployeerRepository {
  createEmployeer(
    employeerDto: EmployeerDto,
  ): Promise<Employeer<EmployeerStatus>>;

  findById(id: string): Promise<EmployeerFound>;
}
