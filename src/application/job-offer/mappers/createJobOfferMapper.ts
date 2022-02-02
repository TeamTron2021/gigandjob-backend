import JobOfferDate from 'src/domain/job-offer/value-objects/JobOffer/JobOfferDate';
import JobOfferDescription from 'src/domain/job-offer/value-objects/JobOffer/JobOfferDescription';
import JobOfferId from 'src/domain/job-offer/value-objects/JobOffer/JobOfferId';
import JobOfferSalary from 'src/domain/job-offer/value-objects/JobOffer/JobOfferSalary';
import JobOfferSkill from 'src/domain/job-offer/value-objects/JobOffer/JobOfferSkill';
import JobOfferTItle from 'src/domain/job-offer/value-objects/JobOffer/JobOfferTitle';
import JobOfferVacant from 'src/domain/job-offer/value-objects/JobOffer/JobOfferVacant';
import CreateJobOfferDto from '../ports/createJobOffer.dto';
import JobOffer from '../../../domain/job-offer/entities/JobOffer.aggregate';
import { OfferStatus } from 'src/domain/job-offer/shared/OfferStatus.enum';
import { CreateSkillsDto } from '../ports/createSkills.dto';

export default class CreateJobOfferMapper {
  constructor(private readonly jobOfferDto: CreateJobOfferDto) {}

  public map(): JobOffer<OfferStatus> {
    const {
      id,
      description,
      salary,
      skills,
      title,
      vacant,
      startDate,
      finalDate,
    } = this.jobOfferDto;
    const jobOfferId: JobOfferId = this.convertToJobOfferId(id);
    const jobOfferDescription: JobOfferDescription =
      this.convertToJobOfferDescription(description);
    const jobOfferSalary: JobOfferSalary = this.convertToJobOfferSalary(salary);
    const jobOfferSkills: JobOfferSkill[] = this.convertToJobOfferSkill(skills);
    const jobOfferTitle: JobOfferTItle = this.convertToJobOfferTittle(title);
    const jobOfferVacants: JobOfferVacant =
      this.convertToJobOfferVacant(vacant);
    const jobOfferDate: JobOfferDate = this.convertToJobOfferDate(
      startDate,
      finalDate,
    );
    return JobOffer.create(
      jobOfferDescription,
      jobOfferSalary,
      jobOfferSkills,
      jobOfferTitle,
      jobOfferVacants,
      [],
      [],
      jobOfferDate,
      jobOfferId,
    );
  }

  private convertToJobOfferId(id: string): JobOfferId {
    return JobOfferId.create(id);
  }
  private convertToJobOfferDate(
    startDate: Date,
    finalDate: Date,
  ): JobOfferDate {
    return JobOfferDate.create(
      new Date(Date.parse(startDate.toString())),
      new Date(Date.parse(finalDate.toString())),
    );
  }
  private convertToJobOfferVacant(vacant: number): JobOfferVacant {
    return JobOfferVacant.create(vacant);
  }
  private convertToJobOfferTittle(title: string): JobOfferTItle {
    return JobOfferTItle.create(title);
  }
  private convertToJobOfferSkill(skills: CreateSkillsDto[]): JobOfferSkill[] {
    const jobOfferSkills: JobOfferSkill[] = skills.map((skill) => {
      return JobOfferSkill.create(skill.skill);
    });
    return jobOfferSkills;
  }
  private convertToJobOfferSalary(salary: number): JobOfferSalary {
    return JobOfferSalary.create(salary);
  }
  private convertToJobOfferDescription(
    description: string,
  ): JobOfferDescription {
    return JobOfferDescription.create(description);
  }
}
