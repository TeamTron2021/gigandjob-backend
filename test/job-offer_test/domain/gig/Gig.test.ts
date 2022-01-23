import Gig from '../../../../src/domain/job-offer/entities/Gig';
import { Time } from '../../../../src/domain/job-offer/shared/Time.enum';
import JobOfferGigDuration from '../../../../src/domain/job-offer/value-objects/Gig/JobOfferGigDuration';
import JobOfferDate from '../../../../src/domain/job-offer/value-objects/JobOffer/JobOfferDate';
import JobOfferDescription from '../../../../src/domain/job-offer/value-objects/JobOffer/JobOfferDescription';
import JobOfferId from '../../../../src/domain/job-offer/value-objects/JobOffer/JobOfferId';
import JobOfferSalary from '../../../../src/domain/job-offer/value-objects/JobOffer/JobOfferSalary';
import JobOfferSkill from '../../../../src/domain/job-offer/value-objects/JobOffer/JobOfferSkill';
import JobOfferTItle from '../../../../src/domain/job-offer/value-objects/JobOffer/JobOfferTitle';
import JobOfferVacant from '../../../../src/domain/job-offer/value-objects/JobOffer/JobOfferVacant';
import UniqueId from '../../../../src/shared/domain/UniqueUUID';

describe('Testing Gig entity', () => {
  it('Should return a instance of Gig', () => {
    const skills: JobOfferSkill[] = [
      JobOfferSkill.create('SQL'),
      JobOfferSkill.create('Mongo'),
      JobOfferSkill.create('Inteligencia emocional'),
    ];

    const initialDate = new Date();
    const finalDate = new Date();
    initialDate.setDate(finalDate.getDate() - 1);
    const date = JobOfferDate.create(initialDate, finalDate);

    const time = Time.Days;
    const amount = 50;
    const gigDuration = JobOfferGigDuration.create(time, amount);

    const id = JobOfferId.create(new UniqueId().getId());
    const gig = Gig.create(
      JobOfferDescription.create(
        'Descripcion generica de una oferta de trabajo',
      ),
      JobOfferSalary.create(1500),
      skills,
      JobOfferTItle.create('Titulo generico de una oferta'),
      JobOfferVacant.create(3),
      date,
      id,
      gigDuration,
    );
    expect(gig).toBeInstanceOf(Gig);
  });
});
