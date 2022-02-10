import IAplicationService from 'src/application/shared/interfaces/IAplicationService';
import JobOffer from 'src/domain/job-offer/entities/JobOffer.aggregate';
import { OfferStatus } from 'src/domain/job-offer/shared/OfferStatus.enum';
import CreateJobOfferMapper from '../mappers/createJobOfferMapper';
import CreateJobOfferDto from '../ports/createJobOffer.dto';
import { CreateSkillsDto } from '../ports/createSkills.dto';
import JobOfferToSave from '../ports/jobOfferToSave.dto';

export default class CreateJobOfferService implements IAplicationService {
  execute(jobOfferDto: CreateJobOfferDto): JobOfferToSave {
    const mapperDtoToDomain: CreateJobOfferMapper = new CreateJobOfferMapper(
      jobOfferDto,
    );
    const jobOffer: JobOffer<OfferStatus> = mapperDtoToDomain.map();
    const offerToSave: JobOfferToSave = {
      id: jobOffer.getOfferId().getId(),
      description: jobOffer.description.getDescription(),
      salary: jobOffer.salary.getSalary(),
      skills: [
        ...jobOffer.skills.map((element) => {
          const skillDto: CreateSkillsDto = {
            skill: element.getSkill(),
          };
          return skillDto;
        }),
      ],
      title: jobOffer.title.getTitle(),
      vacant: jobOffer.vacant.getVacants(),
      startDate: jobOffer.date.getStartDate(),
      finalDate: jobOffer.date.getFinalDate(),
      status: jobOffer.status,
    };

    return offerToSave;
  }
}
