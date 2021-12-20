import  IDomainEvent  from "../../../shared/domain/IDomainEvent";
import EmployeerCreated from "../domain-events/employeer/EmployeerCreated.Event";
import { EmployeerStatus } from "../shared/EmployeerStatus.enum";
import EmployeerCompanyMail from "../value-objects/employeer/EmployeerCompanyMail";
import EmployeerCompanyName from "../value-objects/employeer/EmployeerCompanyName";
import EmployeerId from "../value-objects/employeer/EmployeerId";
import EmployeerIndustry from "../value-objects/employeer/EmployeerIndustry";
import EmployeerLocalization from "../value-objects/employeer/EmployeerLocalization";
import EmployeerRif from "../value-objects/employeer/EmployeerRif";

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

        return employeer;

        
    }
    protected invariants(){}
}