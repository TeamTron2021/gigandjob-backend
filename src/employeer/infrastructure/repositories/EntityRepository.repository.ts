import { EntityRepository, Repository } from 'typeorm';
import { EmployeerORM } from '../orm/employeer.orm';

@EntityRepository(EmployeerORM)
export class EmployeerRepository extends Repository<EmployeerORM> {
  async createEmployeer(uuid: string, name: string): Promise<EmployeerORM> {
    const employeer: EmployeerORM = this.create({ uuid, name });
    await this.save(employeer);
    return employeer;
  }
}
