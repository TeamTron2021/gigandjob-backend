import { ConflictException } from '@nestjs/common';
import Employeer from 'src/domain/employeer/entities/Employeer.aggregate';
import { EmployeerStatus } from 'src/domain/employeer/shared/EmployeerStatus.enum';
import EmployeerDto from 'src/employeer/application/ports/employeer.dto';
import IEmployeerRepository from 'src/employeer/application/repositories/employeer.repository';
import { EntityRepository, Repository } from 'typeorm';
import RegisterEmployeerMapper from '../mappers/registerEmployeer.mapper';
import { EmployeerORM } from '../orm/employeer.orm';

@EntityRepository(EmployeerORM)
export class EmployeerRepository
  extends Repository<EmployeerORM>
  implements IEmployeerRepository
{
  async createEmployeer(
    employeerDto: EmployeerDto,
  ): Promise<Employeer<EmployeerStatus>> {
    const { id, companyName, companyMail, rif, latitude, longitude, industry } =
      employeerDto;
    const employeerORM: EmployeerORM = this.create({
      id,
      companyName,
      companyMail,
      rif,
      latitude,
      longitude,
      industry,
      status: EmployeerStatus.NOT_SUSPENDED,
    });
    try {
      await this.save(employeerORM);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Parece que ese rif esta en uso');
      }
    }
    const employeer =
      RegisterEmployeerMapper.convertEmployeerORMtoDomain(employeerORM);

    return employeer;
  }
}
