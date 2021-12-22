import { IValueObject } from "../../../../shared/domain/IValueObject";
import EmptyJobOfferIssueComplaintException from "../../exceptions/JobOfferComplaint/JobOfferIssueComplaint";

export default class JobOfferComplaintIssue implements IValueObject {
    private constructor(readonly issue: string) {}
  
    public equals(valueObject: JobOfferComplaintIssue): boolean {
        return this.issue === valueObject.getId();
    }
  
    public getId() {
        return this.issue;
    }
    
    public static create(issue: string) {
  
        if(issue == undefined || issue == null){
            throw new EmptyJobOfferIssueComplaintException(
                'La Issue de JobOfferComplaint no puede ser undefined o null'
            );
        }
        if(issue.length > 50 ){
          throw new EmptyJobOfferIssueComplaintException(
              'El Issue de JobOfferComplaint no debe sobrepasar de 50 caracteres'
          );
        }
    
        return new JobOfferComplaintIssue(issue);
    }
  
  }