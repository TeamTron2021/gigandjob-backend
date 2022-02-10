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
import EmployeerToSaveDto from 'src/application/employeer/ports/employeerToSave.dto';

@EntityRepository(EmployeerORM)
export class EmployeerRepository
  extends Repository<EmployeerORM>
  implements IEmployeerRepository
{
  async findEmployeers(): Promise<EmployeerFound[]> {
    try {
      const employeers = await this.find();
      const result: EmployeerFound[] =
        RegisterEmployeerMapper.convertManyEmployeersToFound(employeers);
      return result;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
  async createEmployeer(employeerDto: EmployeerToSaveDto): Promise<void> {
    const {
      id,
      companyName,
      companyMail,
      rif,
      latitude,
      longitude,
      industry,
      status,
    } = employeerDto;
    const employeerORM: EmployeerORM = this.create({
      id,
      companyName,
      companyMail,
      rif,
      latitude,
      longitude,
      industry,
      status,
    });
    try {
      await this.save(employeerORM);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Parece que ese rif esta en uso');
      }
    }
    return;
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
