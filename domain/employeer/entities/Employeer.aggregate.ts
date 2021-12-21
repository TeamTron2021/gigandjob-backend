import  IDomainEvent  from "../../../shared/domain/IDomainEvent";
import EmployeerCreated from "../domain-events/employeer/EmployeerCreated.Event";
import EmployeerRegistered from "../domain-events/notifications/EmployeerRegistered.Event";
import { EmployeerStatus } from "../shared/EmployeerStatus.enum";
import NotificationContent from "../value-objects/employeer-notification/NotificationContent";
import NotificationSubject from "../value-objects/employeer-notification/NotificationSubject";
import EmployeerCompanyMail from "../value-objects/employeer/EmployeerCompanyMail";
import EmployeerCompanyName from "../value-objects/employeer/EmployeerCompanyName";
import EmployeerId from "../value-objects/employeer/EmployeerId";
import EmployeerIndustry from "../value-objects/employeer/EmployeerIndustry";
import EmployeerLocalization from "../value-objects/employeer/EmployeerLocalization";
import EmployeerRif from "../value-objects/employeer/EmployeerRif";
import EmployeerNotification from "./EmployeerNotification";

export default class Employeer<S extends EmployeerStatus> {
    private eventRecorder: IDomainEvent[] = []; 
    public status: S ; 
    constructor(
        public CompanyMail: EmployeerCompanyMail, 
        public CompanyName: EmployeerCompanyName, 
        private id: EmployeerId, 
        public industry:EmployeerIndustry, 
        public rif: EmployeerRif,
        status: S,
        public localization:EmployeerLocalization
    ){
        this.status = status;
    }

    public getId(){
        return this.id;
    }
    public getEvents(){
        return this.eventRecorder;
    }
    public static create(
        CompanyMail: EmployeerCompanyMail, 
        CompanyName: EmployeerCompanyName, 
        id: EmployeerId, 
        industry:EmployeerIndustry, 
        rif: EmployeerRif,
        localization:EmployeerLocalization

    )
    {
        const employeer = new Employeer(
            CompanyMail,
            CompanyName, 
            id,
            industry, 
            rif, 
            EmployeerStatus.NOT_SUSPENDED, 
            localization
        ); 

        employeer.eventRecorder.push(new EmployeerCreated(
            CompanyMail,
            CompanyName,
            id, 
            industry,
            rif,
            EmployeerStatus.NOT_SUSPENDED,
            localization
        ))

        const subject = new NotificationSubject('Felicidades por unirte a gig and job');
        const content = new NotificationContent('Ahora tienes que seguir los siguientes pasos');
        const employeerNotification = EmployeerNotification.register(
            subject,
            content, 
            employeer
        )

        employeer.eventRecorder.push(new EmployeerRegistered(subject, content));
        return employeer;

        
    }
    protected invariants(){}
}