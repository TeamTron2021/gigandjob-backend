import { PostulationCreated } from '../../../../domain/job-offer/domain-events/postulation/PostulationCreated';
import JobOffer from '../../../../domain/job-offer/entities/JobOffer.aggregate';
import { JobOfferComplaint } from '../../../../domain/job-offer/entities/JobOfferComplaint';
import { JobOfferLike } from '../../../../domain/job-offer/entities/JobOfferLike';
import { Postulation } from '../../../../domain/job-offer/entities/postulation';
import { OfferStatus } from '../../../../domain/job-offer/shared/OfferStatus.enum';
import JobOfferDate from '../../../../domain/job-offer/value-objects/JobOffer/JobOfferDate';
import JobOfferDescription from '../../../../domain/job-offer/value-objects/JobOffer/JobOfferDescription';
import JobOfferId from '../../../../domain/job-offer/value-objects/JobOffer/JobOfferId';
import JobOfferSalary from '../../../../domain/job-offer/value-objects/JobOffer/JobOfferSalary';
import JobOfferSkill from '../../../../domain/job-offer/value-objects/JobOffer/JobOfferSkill';
import JobOfferTItle from '../../../../domain/job-offer/value-objects/JobOffer/JobOfferTitle';
import JobOfferVacant from '../../../../domain/job-offer/value-objects/JobOffer/JobOfferVacant';
import JobOfferComplaintId from '../../../../domain/job-offer/value-objects/JobOfferComplaint/JobOfferComplaitId';
import JobOfferComplaintDate from '../../../../domain/job-offer/value-objects/JobOfferComplaint/JobOfferDateComplaint';
import JobOfferComplaintIssue from '../../../../domain/job-offer/value-objects/JobOfferComplaint/JobOfferIssueComplaint';
import { PostulationDate } from '../../../../domain/job-offer/value-objects/postulation/PostulationDate';
import UniqueId from '../../../../shared/domain/UniqueUUID';
import InterviewDate from '../../../../domain/job-offer/value-objects/Interview/interview/InterviewDate';
import InterviewId from '../../../../domain/job-offer/value-objects/Interview/interview/InterviewId';
import InterviewTitle from '../../../../domain/job-offer/value-objects/Interview/interview/InterviewTitle';
import InterviewDescription from '../../../../domain/job-offer/value-objects/Interview/interview/InterviewDescription';
import OnlineInterviewUrlMeeting from '../../../../domain/job-offer/value-objects/Interview/OnlineInterview/OnlineInterviewUrlMeeting';
import { InterviewStatus } from '../../../../domain/job-offer/shared/InterviewStatus.enum';
import InterviewCurrentlyDisabledException from '../../../../domain/job-offer/exceptions/Interview/ChangeInterviewStatus/InterviewCurrentlyDisabledException';
import InPersonInterviewDirection from '../../../../domain/job-offer/value-objects/Interview/InPersonInterview/InPersonInterviewDirection';

// Valores para crear una entrevista online:
const interviewInitialDate = new Date();
const interviewFinalDate = new Date();
interviewInitialDate.setDate(interviewFinalDate.getDate() - 1);
const interviewDate = InterviewDate.create(
  interviewInitialDate,
  interviewFinalDate,
);
const interviewId = InterviewId.create(new UniqueId().getId());
const interviewTitle = InterviewTitle.create(
  'Titulo gen??rico de una entrevista',
);
const interviewDescription = InterviewDescription.create(
  'Descripci??n gen??rica de una entrevista de trabajo',
);
const interviewUrlMeeting = OnlineInterviewUrlMeeting.create(
  'Url gen??rica de una entrevista online',
);
const interviewDirection = InPersonInterviewDirection.create(
  'Direcci??n gen??rica de una entrevista presencial',
);

describe('Testing JobOffer creation', () => {
  it('Should return a JobOffer instance', () => {
    const skills: JobOfferSkill[] = [
      JobOfferSkill.create('SQL'),
      JobOfferSkill.create('Mongo'),
      JobOfferSkill.create('Inteligencia emocional'),
    ];

    const initialDate = new Date();
    const finalDate = new Date();
    initialDate.setDate(finalDate.getDate() - 1);
    const date = JobOfferDate.create(initialDate, finalDate);

    const likes: JobOfferLike[] = [
      //Inicia vacio
    ];

    const complaint: JobOfferComplaint[] = [
      //Inicia vacio
    ];

    const id = JobOfferId.create(new UniqueId().getId());
    const jobOffer = JobOffer.create(
      JobOfferDescription.create(
        'Descripcion generica de una oferta de trabajo',
      ),
      JobOfferSalary.create(1500),
      skills,
      JobOfferTItle.create('Titulo generico de una oferta'),
      JobOfferVacant.create(3),
      likes,
      complaint,
      date,
      id,
    );

    const JobOfferLikeNew1 = JobOfferLike.likeOffer(); ///Luego de creado se grega like
    likes.push(JobOfferLikeNew1);

    const postulation = Postulation.create(new PostulationDate(new Date()));
    expect(postulation).toBeInstanceOf(Postulation);

    const eventCreated = new PostulationCreated(
      postulation.getId(),
      postulation.getDate(),
      postulation.status,
    );

    JobOfferLike.removelike(likes); //Se remueve el like

    jobOffer.addPostulation(postulation);
    expect(jobOffer.getPostulations()).toContainEqual(postulation);

    const complaintId = JobOfferComplaintId.create(new UniqueId().getId()); //Luego de creado se agrega una denuncia
    const issue = JobOfferComplaintIssue.create('Issue');
    const complaintDate = JobOfferComplaintDate.create(new Date());
    const createComplaint = JobOfferComplaint.create(
      complaintId,
      issue,
      complaintDate,
    );
    complaint.push(createComplaint);

    expect(jobOffer).toBeInstanceOf(JobOffer);
  });
  it('Should return a JobOffer instance Modified', () => {
    const skills: JobOfferSkill[] = [
      JobOfferSkill.create('SQL'),
      JobOfferSkill.create('Mongo'),
      JobOfferSkill.create('Inteligencia emocional'),
    ];

    const initialDate = new Date();
    const finalDate = new Date();
    initialDate.setDate(finalDate.getDate() - 1);
    const date = JobOfferDate.create(initialDate, finalDate);

    const likes: JobOfferLike[] = [
      //Inicia vacio
    ];

    const complaint: JobOfferComplaint[] = [
      //Inicia vacio
    ];

    const id = JobOfferId.create(new UniqueId().getId());
    const jobOffer = JobOffer.create(
      JobOfferDescription.create(
        'Descripcion generica de una oferta de trabajo',
      ),
      JobOfferSalary.create(1500),
      skills,
      JobOfferTItle.create('Titulo generico de una oferta'),
      JobOfferVacant.create(3),
      likes,
      complaint,
      date,
      id,
    );

    const JobOfferLikeNew1 = JobOfferLike.likeOffer(); //Luego de creado se grega like
    likes.push(JobOfferLikeNew1);

    const postulation = Postulation.create(new PostulationDate(new Date()));
    expect(postulation).toBeInstanceOf(Postulation);

    const eventCreated = new PostulationCreated(
      postulation.getId(),
      postulation.getDate(),
      postulation.status,
    );

    JobOfferLike.removelike(likes); //Luego de creado se remueve un like

    jobOffer.addPostulation(postulation);
    expect(jobOffer.getPostulations()).toContainEqual(postulation);

    const complaintId = JobOfferComplaintId.create(new UniqueId().getId()); //Luego de creado se agrega una denuncia
    const issue = JobOfferComplaintIssue.create('Issue');
    const complaintDate = JobOfferComplaintDate.create(new Date());
    const createComplaint = JobOfferComplaint.create(
      complaintId,
      issue,
      complaintDate,
    );
    complaint.push(createComplaint);

    //Aqui se realiza la modificaci??n
    jobOffer.modified(
      JobOfferDescription.create(
        'Se cambia la descripcion de la oferta de trabajo',
      ),
      JobOfferSalary.create(2000),
      skills,
      JobOfferTItle.create('Se cambia el titulo de una oferta'),
      JobOfferVacant.create(2),
      likes,
      complaint,
      date,
      id,
    );
    expect(jobOffer).toBeInstanceOf(JobOffer);
  });
  it('Should update the JobOffer suspended', () => {
    const skills: JobOfferSkill[] = [
      JobOfferSkill.create('SQL'),
      JobOfferSkill.create('Mongo'),
      JobOfferSkill.create('Inteligencia emocional'),
    ];

    const initialDate = new Date();
    const finalDate = new Date();
    initialDate.setDate(finalDate.getDate() - 1);
    const date = JobOfferDate.create(initialDate, finalDate);

    const likes: JobOfferLike[] = [
      //Inicia vacio
    ];

    const complaint: JobOfferComplaint[] = [
      //Inicia vacio
    ];

    const id = JobOfferId.create(new UniqueId().getId());
    const jobOffer = JobOffer.create(
      JobOfferDescription.create(
        'Descripcion generica de una oferta de trabajo',
      ),
      JobOfferSalary.create(1500),
      skills,
      JobOfferTItle.create('Titulo generico de una oferta'),
      JobOfferVacant.create(3),
      likes,
      complaint,
      date,
      id,
    );

    const JobOfferLikeNew1 = JobOfferLike.likeOffer(); ///Luego de creado se grega like
    likes.push(JobOfferLikeNew1);

    const postulation = Postulation.create(new PostulationDate(new Date()));
    expect(postulation).toBeInstanceOf(Postulation);

    const eventCreated = new PostulationCreated(
      postulation.getId(),
      postulation.getDate(),
      postulation.status,
    );

    JobOfferLike.removelike(likes); //Se remueve el like

    jobOffer.addPostulation(postulation);
    expect(jobOffer.getPostulations()).toContainEqual(postulation);

    const complaintId = JobOfferComplaintId.create(new UniqueId().getId()); //Luego de creado se agrega una denuncia
    const issue = JobOfferComplaintIssue.create('Issue');
    const complaintDate = JobOfferComplaintDate.create(new Date());
    const createComplaint = JobOfferComplaint.create(
      complaintId,
      issue,
      complaintDate,
    );
    complaint.push(createComplaint);
    const test = jobOffer.isPublished();
    expect(test.status).toBe(OfferStatus.published);
    expect(test.isSuspended().status).toBe(OfferStatus.suspended);
  });
  it('Should update the JobOffer Published', () => {
    const skills: JobOfferSkill[] = [
      JobOfferSkill.create('SQL'),
      JobOfferSkill.create('Mongo'),
      JobOfferSkill.create('Inteligencia emocional'),
    ];

    const initialDate = new Date();
    const finalDate = new Date();
    initialDate.setDate(finalDate.getDate() - 1);
    const date = JobOfferDate.create(initialDate, finalDate);

    const likes: JobOfferLike[] = [
      //Inicia vacio
    ];

    const complaint: JobOfferComplaint[] = [
      //Inicia vacio
    ];

    const id = JobOfferId.create(new UniqueId().getId());
    const jobOffer = JobOffer.create(
      JobOfferDescription.create(
        'Descripcion generica de una oferta de trabajo',
      ),
      JobOfferSalary.create(1500),
      skills,
      JobOfferTItle.create('Titulo generico de una oferta'),
      JobOfferVacant.create(3),
      likes,
      complaint,
      date,
      id,
    );

    const JobOfferLikeNew1 = JobOfferLike.likeOffer(); ///Luego de creado se grega like
    likes.push(JobOfferLikeNew1);

    const postulation = Postulation.create(new PostulationDate(new Date()));
    expect(postulation).toBeInstanceOf(Postulation);

    const eventCreated = new PostulationCreated(
      postulation.getId(),
      postulation.getDate(),
      postulation.status,
    );

    JobOfferLike.removelike(likes); //Se remueve el like

    jobOffer.addPostulation(postulation);
    expect(jobOffer.getPostulations()).toContainEqual(postulation);

    const complaintId = JobOfferComplaintId.create(new UniqueId().getId()); //Luego de creado se agrega una denuncia
    const issue = JobOfferComplaintIssue.create('Issue');
    const complaintDate = JobOfferComplaintDate.create(new Date());
    const createComplaint = JobOfferComplaint.create(
      complaintId,
      issue,
      complaintDate,
    );
    complaint.push(createComplaint);

    expect(jobOffer.status).toBe(OfferStatus.notPublished);

    expect(jobOffer.isPublished().status).toBe(OfferStatus.published);

    expect(jobOffer.JobOfferRevoked().status).toBe(OfferStatus.disable);
  });

  test('Should throw an interview currently disabled error for an online interview', () => {
    // Creaci??n de la oferta de trabajo.
    const skills: JobOfferSkill[] = [
      JobOfferSkill.create('SQL'),
      JobOfferSkill.create('Mongo'),
      JobOfferSkill.create('Inteligencia emocional'),
    ];

    const initialDate = new Date();
    const finalDate = new Date();
    initialDate.setDate(finalDate.getDate() - 1);
    const date = JobOfferDate.create(initialDate, finalDate);

    const likes: JobOfferLike[] = [
      //Inicia vacio
    ];

    const complaint: JobOfferComplaint[] = [
      //Inicia vacio
    ];

    const id = JobOfferId.create(new UniqueId().getId());
    const jobOffer = JobOffer.create(
      JobOfferDescription.create(
        'Descripcion generica de una oferta de trabajo',
      ),
      JobOfferSalary.create(1500),
      skills,
      JobOfferTItle.create('Titulo generico de una oferta'),
      JobOfferVacant.create(3),
      likes,
      complaint,
      date,
      id,
    );

    expect(() => {
      jobOffer.acceptOnlineInterview(
        interviewTitle,
        interviewDescription,
        interviewDate,
        InterviewStatus.disabled,
        interviewId,
        interviewUrlMeeting,
      );
    }).toThrow(
      new InterviewCurrentlyDisabledException(
        'La entrevista est?? actualmente deshabilitada.',
      ),
    );
  });

  test('Should not throw any errors for an online interview', () => {
    // Creaci??n de la oferta de trabajo.
    const skills: JobOfferSkill[] = [
      JobOfferSkill.create('SQL'),
      JobOfferSkill.create('Mongo'),
      JobOfferSkill.create('Inteligencia emocional'),
    ];

    const initialDate = new Date();
    const finalDate = new Date();
    initialDate.setDate(finalDate.getDate() - 1);
    const date = JobOfferDate.create(initialDate, finalDate);

    const likes: JobOfferLike[] = [
      //Inicia vacio
    ];

    const complaint: JobOfferComplaint[] = [
      //Inicia vacio
    ];

    const id = JobOfferId.create(new UniqueId().getId());
    const jobOffer = JobOffer.create(
      JobOfferDescription.create(
        'Descripcion generica de una oferta de trabajo',
      ),
      JobOfferSalary.create(1500),
      skills,
      JobOfferTItle.create('Titulo generico de una oferta'),
      JobOfferVacant.create(3),
      likes,
      complaint,
      date,
      id,
    );

    expect(() => {
      jobOffer.acceptOnlineInterview(
        interviewTitle,
        interviewDescription,
        interviewDate,
        InterviewStatus.created,
        interviewId,
        interviewUrlMeeting,
      );
    }).not.toThrow();
  });

  test('Should throw an interview currently disabled error for an in person interview', () => {
    // Creaci??n de la oferta de trabajo.
    const skills: JobOfferSkill[] = [
      JobOfferSkill.create('SQL'),
      JobOfferSkill.create('Mongo'),
      JobOfferSkill.create('Inteligencia emocional'),
    ];

    const initialDate = new Date();
    const finalDate = new Date();
    initialDate.setDate(finalDate.getDate() - 1);
    const date = JobOfferDate.create(initialDate, finalDate);

    const likes: JobOfferLike[] = [
      //Inicia vacio
    ];

    const complaint: JobOfferComplaint[] = [
      //Inicia vacio
    ];

    const id = JobOfferId.create(new UniqueId().getId());
    const jobOffer = JobOffer.create(
      JobOfferDescription.create(
        'Descripcion generica de una oferta de trabajo',
      ),
      JobOfferSalary.create(1500),
      skills,
      JobOfferTItle.create('Titulo generico de una oferta'),
      JobOfferVacant.create(3),
      likes,
      complaint,
      date,
      id,
    );

    expect(() => {
      jobOffer.acceptInPersonInterview(
        interviewTitle,
        interviewDescription,
        interviewDate,
        InterviewStatus.disabled,
        interviewId,
        interviewDirection,
      );
    }).toThrow(
      new InterviewCurrentlyDisabledException(
        'La entrevista est?? actualmente deshabilitada.',
      ),
    );
  });

  test('Should not throw any errors for an in person interview', () => {
    // Creaci??n de la oferta de trabajo.
    const skills: JobOfferSkill[] = [
      JobOfferSkill.create('SQL'),
      JobOfferSkill.create('Mongo'),
      JobOfferSkill.create('Inteligencia emocional'),
    ];

    const initialDate = new Date();
    const finalDate = new Date();
    initialDate.setDate(finalDate.getDate() - 1);
    const date = JobOfferDate.create(initialDate, finalDate);

    const likes: JobOfferLike[] = [
      //Inicia vacio
    ];

    const complaint: JobOfferComplaint[] = [
      //Inicia vacio
    ];

    const id = JobOfferId.create(new UniqueId().getId());
    const jobOffer = JobOffer.create(
      JobOfferDescription.create(
        'Descripcion generica de una oferta de trabajo',
      ),
      JobOfferSalary.create(1500),
      skills,
      JobOfferTItle.create('Titulo generico de una oferta'),
      JobOfferVacant.create(3),
      likes,
      complaint,
      date,
      id,
    );

    expect(() => {
      jobOffer.acceptInPersonInterview(
        interviewTitle,
        interviewDescription,
        interviewDate,
        InterviewStatus.created,
        interviewId,
        interviewDirection,
      );
    }).not.toThrow();
  });
  it('Should update the JobOffer Reactivated', () => {
    const skills: JobOfferSkill[] = [
      JobOfferSkill.create('SQL'),
      JobOfferSkill.create('Mongo'),
      JobOfferSkill.create('Inteligencia emocional'),
    ];
    const initialDate = new Date();
    const finalDate = new Date();
    initialDate.setDate(finalDate.getDate() - 1);
    const date = JobOfferDate.create(initialDate, finalDate);

    const likes: JobOfferLike[] = [
      //Inicia vacio
    ];

    const complaint: JobOfferComplaint[] = [
      //Inicia vacio
    ];

    const id = JobOfferId.create(new UniqueId().getId());
    const jobOffer = JobOffer.create(
      JobOfferDescription.create(
        'Descripcion generica de una oferta de trabajo',
      ),
      JobOfferSalary.create(1500),
      skills,
      JobOfferTItle.create('Titulo generico de una oferta'),
      JobOfferVacant.create(3),
      likes,
      complaint,
      date,
      id,
    );

    const JobOfferLikeNew1 = JobOfferLike.likeOffer(); ///Luego de creado se grega like
    likes.push(JobOfferLikeNew1);

    const postulation = Postulation.create(new PostulationDate(new Date()));
    expect(postulation).toBeInstanceOf(Postulation);

    const eventCreated = new PostulationCreated(
      postulation.getId(),
      postulation.getDate(),
      postulation.status,
    );

    JobOfferLike.removelike(likes); //Se remueve el like

    jobOffer.addPostulation(postulation);
    expect(jobOffer.getPostulations()).toContainEqual(postulation);

    const complaintId = JobOfferComplaintId.create(new UniqueId().getId()); //Luego de creado se agrega una denuncia
    const issue = JobOfferComplaintIssue.create('Issue');
    const complaintDate = JobOfferComplaintDate.create(new Date());
    const createComplaint = JobOfferComplaint.create(
      complaintId,
      issue,
      complaintDate,
    );
    complaint.push(createComplaint);
    const test = jobOffer.isPublished();
    expect(test.status).toBe(OfferStatus.published);
    const test2 = test.isSuspended();
    expect(test2.status).toBe(OfferStatus.suspended);
    expect(test2.ReactivatedOffer().status).toBe(OfferStatus.published);
  });
  
  // TODO: agregar pruebas para acceptInterview.
});
