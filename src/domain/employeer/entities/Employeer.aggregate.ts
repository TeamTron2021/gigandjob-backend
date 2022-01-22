/* eslint-disable @typescript-eslint/no-empty-function */
import IAggregateRoot from '../../../shared/domain/IAggregateRoot';
import IDomainEvent from '../../../shared/domain/IDomainEvent';
import JobOffer from '../../job-offer/entities/JobOffer.aggregate';
import { OfferStatus } from '../../job-offer/shared/OfferStatus.enum';
import EmployeerCreated from '../domain-events/employeer/EmployeerCreated.Event';
import EmployeerSuspended from '../domain-events/employeer/EmployeerSuspended.Event';
import EmployeerRegistered from '../domain-events/notifications/EmployeerRegistered.Event';
import EmployeerSuspendedNotification from '../domain-events/notifications/EmployeerSuspendedNotification.Event';
import { EmployeerStatus } from '../shared/EmployeerStatus.enum';
import NotificationContent from '../value-objects/employeer-notification/NotificationContent';
import NotificationSubject from '../value-objects/employeer-notification/NotificationSubject';
import EmployeerCompanyMail from '../value-objects/employeer/EmployeerCompanyMail';
import EmployeerCompanyName from '../value-objects/employeer/EmployeerCompanyName';
import EmployeerId from '../value-objects/employeer/EmployeerId';
import EmployeerIndustry from '../value-objects/employeer/EmployeerIndustry';
import EmployeerLocalization from '../value-objects/employeer/EmployeerLocalization';
import EmployeerRif from '../value-objects/employeer/EmployeerRif';
import EmployeerNotification from './EmployeerNotification';

export default class Employeer<
  S extends EmployeerStatus,
> extends IAggregateRoot {
  private eventRecorder: IDomainEvent[] = [];
  private jobOffers: JobOffer<OfferStatus>[] = [];
  public status: S;
  constructor(
    public CompanyMail: EmployeerCompanyMail,
    public CompanyName: EmployeerCompanyName,
    private id: EmployeerId,
    public industry: EmployeerIndustry,
    public rif: EmployeerRif,
    status: S,
    public localization: EmployeerLocalization,
  ) {
    super();
    this.status = status;
  }

  public addJobOffer(offer: JobOffer<OfferStatus>) {
    this.jobOffers.push(offer);
  }
  public getOffers() {
    return this.jobOffers;
  }
  public getId() {
    return this.id;
  }
  public getEvents() {
    return this.eventRecorder;
  }
  public static create(
    CompanyMail: EmployeerCompanyMail,
    CompanyName: EmployeerCompanyName,
    id: EmployeerId,
    industry: EmployeerIndustry,
    rif: EmployeerRif,
    localization: EmployeerLocalization,
  ) {
    const employeer = new Employeer(
      CompanyMail,
      CompanyName,
      id,
      industry,
      rif,
      EmployeerStatus.NOT_SUSPENDED,
      localization,
    );

    employeer.eventRecorder.push(
      new EmployeerCreated(
        CompanyMail,
        CompanyName,
        id,
        industry,
        rif,
        EmployeerStatus.NOT_SUSPENDED,
        localization,
      ),
    );

    const subject = new NotificationSubject(
      'Felicidades por unirte a gig and job',
    );
    const content = new NotificationContent(
      'Ahora tienes que seguir los siguientes pasos',
    );
    const employeerNotification = EmployeerNotification.register(
      subject,
      content,
      employeer,
    );

    employeer.eventRecorder.push(new EmployeerRegistered(subject, content));
    return employeer;
  }

  public suspendEmployeer(
    this: Employeer<EmployeerStatus.NOT_SUSPENDED>,
  ): Employeer<EmployeerStatus.SUSPENDED> {
    const employeer = new Employeer(
      this.CompanyMail,
      this.CompanyName,
      this.id,
      this.industry,
      this.rif,
      EmployeerStatus.SUSPENDED,
      this.localization,
    );
    employeer.eventRecorder = this.eventRecorder.slice(0);
    employeer.eventRecorder.push(
      new EmployeerSuspended(this.id, EmployeerStatus.SUSPENDED),
    );
    const subject = new NotificationSubject('Tu cuenta ha sido suspendida');
    const content = new NotificationContent(
      'Ahora tienes que seguir los siguientes pasos',
    );
    const employeerNotification = new EmployeerNotification(
      subject,
      content,
      employeer,
    );
    employeerNotification.sendSuspension();
    return employeer;
  }

  public reactiveEmployeer(
    this: Employeer<EmployeerStatus.SUSPENDED>,
  ): Employeer<EmployeerStatus.NOT_SUSPENDED> {
    const employeer = new Employeer(
      this.CompanyMail,
      this.CompanyName,
      this.id,
      this.industry,
      this.rif,
      EmployeerStatus.NOT_SUSPENDED,
      this.localization,
    );
    employeer.eventRecorder = this.eventRecorder.slice(0);
    employeer.eventRecorder.push(
      new EmployeerSuspended(this.id, EmployeerStatus.NOT_SUSPENDED),
    );
    const subject = new NotificationSubject('Tu cuenta ha sido activada');
    const content = new NotificationContent(
      'Ahora tienes que seguir los siguientes pasos',
    );
    const employeerNotification = new EmployeerNotification(
      subject,
      content,
      employeer,
    );
    employeerNotification.sendReactivation();
    return employeer;
  }

  protected invariants() {}
}
