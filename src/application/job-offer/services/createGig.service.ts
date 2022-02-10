import IAplicationService from 'src/application/shared/interfaces/IAplicationService';
import CreateGigMapper from '../mappers/gigMapper';
import CreateGigDto from '../ports/createGig.dto';
import { CreateSkillsDto } from '../ports/createSkills.dto';
import GigToSave from '../ports/gigToSave.dto';

export default class CreateGigService implements IAplicationService {
  execute(gig: CreateGigDto): GigToSave {
    const mapper: CreateGigMapper = new CreateGigMapper(gig);
    const newGig = mapper.map();
    const gigToSave: GigToSave = {
      id: newGig.Id.getId(),
      description: newGig.description.getDescription(),
      salary: newGig.salary.getSalary(),
      skills: [
        ...newGig.skills.map((element) => {
          const skillDto: CreateSkillsDto = {
            skill: element.getSkill(),
          };
          return skillDto;
        }),
      ],
      title: newGig.title.getTitle(),
      vacant: newGig.vacant.getVacants(),
      startDate: newGig.date.getStartDate(),
      finalDate: newGig.date.getFinalDate(),
      time: newGig.gigDuration.getTime(),
      amount: newGig.gigDuration.getAmount(),
      status: newGig.status,
    };
    return gigToSave;
  }
}
