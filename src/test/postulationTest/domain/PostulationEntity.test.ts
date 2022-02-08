import { PostulationCreated } from '../../../domain/job-offer/domain-events/postulation/PostulationCreated';
import PostulationRejected from '../../../domain/job-offer/domain-events/postulation/PostulationRejected';
import Interview from '../../../domain/job-offer/entities/Interview';
import { Postulation } from '../../../domain/job-offer/entities/postulation';
import { InterviewStatus } from '../../../domain/job-offer/shared/InterviewStatus.enum';
import InterviewDate from '../../../domain/job-offer/value-objects/Interview/interview/InterviewDate';
import InterviewDescription from '../../../domain/job-offer/value-objects/Interview/interview/InterviewDescription';
import InterviewId from '../../../domain/job-offer/value-objects/Interview/interview/InterviewId';
import InterviewTitle from '../../../domain/job-offer/value-objects/Interview/interview/InterviewTitle';
import { PostulationDate } from '../../../domain/job-offer/value-objects/postulation/PostulationDate';
import { PostulationStatus } from '../../../domain/job-offer/value-objects/postulation/PostulationStatus';
import UniqueId from '../../../shared/domain/UniqueUUID';

describe('Postulation Entity test', () => {
  test('Should create a postulation entity with isSend status', () => {
    const postulation = Postulation.create(new PostulationDate(new Date()));

    const initialDate = new Date();
    const date = InterviewDate.create(initialDate);

    const id = InterviewId.create(new UniqueId().getId());
    const interview = Interview.create(
      InterviewTitle.create('Titulo generico de una entrevista'),
      InterviewDescription.create(
        'Descripcion generica de una entrevista de trabajo',
      ),
      date,
      id,
    );
    expect(interview).toBeInstanceOf(Interview);

    postulation.addInterviews(interview);

    expect(postulation).toBeInstanceOf(Postulation);

    const eventCreated = new PostulationCreated(
      postulation.getId(),
      postulation.getDate(),
      postulation.status,
    );
    expect(eventCreated).toBeInstanceOf(PostulationCreated);
    expect(postulation.getEvents()).toContainEqual(eventCreated);
    expect(postulation.status).toEqual(PostulationStatus.isSend);
  });

  test('Should create a postulation and change its status', () => {
    const postulation = Postulation.create(new PostulationDate(new Date()));
    expect(postulation).toBeInstanceOf(Postulation);

    const eventCreated = new PostulationCreated(
      postulation.getId(),
      postulation.getDate(),
      postulation.status,
    );
    expect(eventCreated).toBeInstanceOf(PostulationCreated);
    const postulationRejected = postulation.rejectPostulation();
    const postulationEventRejected = new PostulationRejected(
      postulationRejected.getId(),
      postulationRejected.status,
    );
    expect(postulationRejected.status).toBe(PostulationStatus.reject);
    expect(postulationRejected.getEvents()).toContainEqual(
      postulationEventRejected,
    );
  });

  //test de servicio de aplicación CU. 14.1 Aceptar Oferta de Trabajo

  test('Should create a postulation and change status to passed', () => {
    const postulation = Postulation.create(new PostulationDate(new Date()));
    expect(postulation).toBeInstanceOf(Postulation);
    const eventCreated = new PostulationCreated(
      postulation.getId(),
      postulation.getDate(),
      postulation.status,
    );
    expect(eventCreated).toBeInstanceOf(PostulationCreated);
    const postulationAccepted = postulation.acceptPostulation();
    const postulationEventAccepted = new PostulationRejected(
      postulationAccepted.getId(),
      postulationAccepted.status,
    );
    expect(postulationAccepted.status).toBe(PostulationStatus.passed);
    expect(postulationAccepted.getEvents()).toContainEqual(
      postulationEventAccepted,
    );
  });

  it('Should reactivate the interviews for a user', () => {
    const postulation = Postulation.create(new PostulationDate(new Date()));

    const id = InterviewId.create(new UniqueId().getId());

    const initialDate = new Date();
    const date = InterviewDate.create(initialDate);

    const interv = Interview.create(
      InterviewTitle.create('Titulo generico de una entrevista'),
      InterviewDescription.create(
        'Descripcion generica de una entrevista de trabajo',
      ),
      date,
      id,
    );

    postulation.addInterviews(interv);
    postulation.suspendInterview();
    postulation.reactivateInterviewsUser();

    postulation.getInterviews().forEach((interview) => {
      expect(interview.status).toBe(InterviewStatus.enable);
    });
  });
});
