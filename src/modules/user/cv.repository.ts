import { CVDto as CVDto } from '../../application/user/CV.dto';
import { CVQueryEntity as CVQuery } from './cv-query.entity';
import { Injectable } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { CVStatus } from 'src/domain/user/enums/CVStatus.enum';
import { CVRepository as ICVRepository } from '../../application/user/CV.reporsitory';

@Injectable()
@EntityRepository(CVQuery)
export class CVRepository extends Repository<CVQuery> implements ICVRepository {
  async get(uuid: string): Promise<CVDto> {
    const cv: CVQuery = await this.findOne(uuid);
    const cvDto: CVDto = {
      ID: cv.id,
      academicFormation: cv.data.academicFormation,
      skills: cv.data.skills,
      courses: cv.data.courses,
      status: CVStatus[cv.data.status],
    };
    return cvDto;
  }
}
