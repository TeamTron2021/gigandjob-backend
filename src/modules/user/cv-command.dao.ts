import { CVLoaded } from 'src/domain/user/domain_events/CVLoaded.event';
import { AbstractRepository, EntityRepository } from 'typeorm';
import { CVCommandEntity as CVCommand } from './cv-command.entity';

@EntityRepository(CVCommand)
export class CVCommandDao extends AbstractRepository<CVCommand> {
  async insert(event: CVLoaded) {
    await this.manager.insert(CVCommand, {
      id: event.ID.value,
      academicFormation: event.academicFormation.value,
      skills: event.skills.value,
      courses: event.courses.value,
      status: event.status,
    });
  }
}
