import {
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import Employeer from 'src/domain/employeer/entities/Employeer.aggregate';
import { EmployeerStatus } from 'src/domain/employeer/shared/EmployeerStatus.enum';
import EmployeerDto from 'src/application/employeer/ports/employeer.dto';
import { EntityRepository, Repository } from 'typeorm';
import RegisterEmployeerMapper from '../mappers/registerEmployeer.mapper';
import { EmployeerORM } from '../orm/employeer.orm';
import IEmployeerRepository from 'src/application/employeer/repositories/employeer.repository';
import EmployeerFound from 'src/application/employeer/ports/findEmployeerResult.dto';

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

  async findById(id: string): Promise<EmployeerFound> {
    const employeer: EmployeerORM = await this.findOne(id);
    if (employeer != null) {
      const result: EmployeerFound = {
        ...employeer,
      };
      return result;
    }
    throw new NotFoundException('No encontramos ningun empleador con ese id');
  }
}
