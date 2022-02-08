import { CVLoaded } from 'src/domain/user/domain_events/CVLoaded.event';
import { AbstractRepository, EntityRepository } from 'typeorm';
import { CVQueryEntity as CVQuery } from './cv-query.entity';

@EntityRepository(CVQuery)
export class CVQueryDao extends AbstractRepository<CVQuery> {
  async insert(event: CVLoaded) {
    await this.manager.insert(CVQuery, {
      id: event.ID.value,
      data: {
        academicFormation: event.academicFormation.value,
        skills: event.skills.value,
        courses: event.courses.value,
        status: event.status,
      },
    });
  }
}
