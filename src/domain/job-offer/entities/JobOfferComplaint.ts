import IDomainEvent from '../../../shared/domain/IDomainEvent';
import JobOfferAceptedandRejectedComplaint from '../domain-events/JobOfferComplaint/JobOfferAceptedandRemoveComplaint';
import JobOfferComplaintCreated from '../domain-events/JobOfferComplaint/JobOfferComplaintCreated';
import JobOfferComplaintNotification from './JobOfferComplaintNotification';
import JobOfferAceptedComplaintIdException from '../exceptions/JobOfferComplaint/JobOfferAceptedException';
import JobOfferRejectedComplaintIdException from '../exceptions/JobOfferComplaint/JobOfferRejectedComplaint';
import JobOfferComplaintMessage from '../value-objects/JobOfferComplaint/JobOfferComplaintMessage';
import JobOfferComplaintId from '../value-objects/JobOfferComplaint/JobOfferComplaitId';
import JobOfferComplaintDate from '../value-objects/JobOfferComplaint/JobOfferDateComplaint';
import JobOfferComplaintIssue from '../value-objects/JobOfferComplaint/JobOfferIssueComplaint';

export class JobOfferComplaint {
  private eventRecorder: IDomainEvent[] = [];

  constructor(
    public id: JobOfferComplaintId,
    public issue: JobOfferComplaintIssue,
    public dateComplaint: JobOfferComplaintDate,
    public acceptedOrRejected: boolean | null,
  ) {}

  public getEvents() {
    return this.eventRecorder;
  }

  public addEvent(domainEvent: JobOfferComplaint) {
    this.eventRecorder.push(domainEvent);
  }

  public setAcceptedOrRejected(_acceptedOrRejected: boolean) {
    this.acceptedOrRejected = _acceptedOrRejected;
  }

  public getAcceptedOrRejected() {
    return this.acceptedOrRejected;
  }

  public getissue() {
    return this.issue;
  }

  public getdateComplaint() {
    return this.dateComplaint;
  }

  public getId() {
    return this.id;
  }

  static create(
    id: JobOfferComplaintId,
    issue: JobOfferComplaintIssue,
    dateComplaint: JobOfferComplaintDate,
  ) {
    const offer = new JobOfferComplaint(id, issue, dateComplaint, null);
    offer.eventRecorder.push(
      new JobOfferComplaintCreated(id, issue, dateComplaint, null),
    );
    const Notificacion = new JobOfferComplaintMessage('Se creo una denuncia'); 
    const ComplaintNotification = new JobOfferComplaintNotification(
      Notificacion,
    );
    ComplaintNotification.NotificationComplaint();
    return offer;
  }

  static acceptedComplaint(
    id: JobOfferComplaintId,
    object: JobOfferComplaint,
  ) {

      const compare = object.getId();

      if (id.getId() === compare.getId()) {
        if (object.getAcceptedOrRejected() === null) {
          object.setAcceptedOrRejected(true);
          object.eventRecorder.push(
            new JobOfferAceptedandRejectedComplaint(object.id, true),
          );
          return object;
        }
        if (object.getAcceptedOrRejected() === true) {
          throw new JobOfferAceptedComplaintIdException(
            'Ya fue Aceptada la denuncia',
          );
        }
      }
  }


  static rejectedComplaint(
    id: JobOfferComplaintId,
    object: JobOfferComplaint,
  ) {
      const compare = object.getId();

      if (id.getId() === compare.getId()) {
        object.setAcceptedOrRejected(false);
        object.eventRecorder.push(
          new JobOfferAceptedandRejectedComplaint(object.id, false),
        );
        return object;
      }
      if (object.getAcceptedOrRejected() === true) {
        throw new JobOfferRejectedComplaintIdException(
          'Ya fue Rechazada la denuncia',
        );
      }
    }
}
