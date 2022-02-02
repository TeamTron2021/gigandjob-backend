import Gig from 'src/domain/job-offer/entities/Gig';
import { OfferStatus } from 'src/domain/job-offer/shared/OfferStatus.enum';
import { Time } from 'src/domain/job-offer/shared/Time.enum';
import GigDuration from 'src/domain/job-offer/value-objects/Gig/JobOfferGigDuration';
import JobOfferDate from 'src/domain/job-offer/value-objects/JobOffer/JobOfferDate';
import JobOfferDescription from 'src/domain/job-offer/value-objects/JobOffer/JobOfferDescription';
import JobOfferId from 'src/domain/job-offer/value-objects/JobOffer/JobOfferId';
import JobOfferSalary from 'src/domain/job-offer/value-objects/JobOffer/JobOfferSalary';
import JobOfferSkill from 'src/domain/job-offer/value-objects/JobOffer/JobOfferSkill';
import JobOfferTItle from 'src/domain/job-offer/value-objects/JobOffer/JobOfferTitle';
import JobOfferVacant from 'src/domain/job-offer/value-objects/JobOffer/JobOfferVacant';
import CreateGigDto from '../ports/createGig.dto';
import { CreateSkillsDto } from '../ports/createSkills.dto';

export default class CreateGigMapper {
  constructor(private readonly gig: CreateGigDto) {}

  public map(): Gig<OfferStatus> {
    const {
      id,
      description,
      salary,
      skills,
      title,
      vacant,
      startDate,
      finalDate,
      time,
      amount,
    } = this.gig;
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
    const gigDuration: GigDuration = this.convertToGigDuration(time, amount);
    const gig = Gig.create(
      jobOfferDescription,
      jobOfferSalary,
      jobOfferSkills,
      jobOfferTitle,
      jobOfferVacants,
      jobOfferDate,
      jobOfferId,
      gigDuration,
    );
    return gig;
  }
  private convertToGigDuration(time: Time, amount: number): GigDuration {
    return GigDuration.create(time, amount);
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
