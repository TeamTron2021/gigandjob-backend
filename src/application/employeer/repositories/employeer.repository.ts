import EmployeerToSaveDto from '../ports/employeerToSave.dto';
import EmployeerFound from '../ports/findEmployeerResult.dto';

export default interface IEmployeerRepository {
  createEmployeer(employeerDto: EmployeerToSaveDto): Promise<void>;

  findById(id: string): Promise<EmployeerFound>;

  findEmployeers(): Promise<EmployeerFound[]>;
}
