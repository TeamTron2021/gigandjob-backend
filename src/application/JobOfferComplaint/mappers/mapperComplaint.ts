import { Injectable } from "@nestjs/common";
import { JobOfferComplaint } from "../../../domain/job-offer/entities/JobOfferComplaint";
import JobOfferId from "../../../domain/job-offer/value-objects/JobOffer/JobOfferId";
import JobOfferComplaintId from "../../../domain/job-offer/value-objects/JobOfferComplaint/JobOfferComplaitId";
import JobOfferComplaintDate from "../../../domain/job-offer/value-objects/JobOfferComplaint/JobOfferDateComplaint";
import JobOfferComplaintIssue from "../../../domain/job-offer/value-objects/JobOfferComplaint/JobOfferIssueComplaint";
import UniqueId from "../../../shared/domain/UniqueUUID";
import { ComplaintIdDtoInOut } from "../dto/ComplaintIdDto";
import { CreateJobOfferComplaintDtoIn } from "../dto/createJobOfferComplaintDtoIn";
import { CreateJobOfferComplaintDtoOut } from "../dto/createJonOfferComplaintDtoOut";
import { JobOfferIdDtoInOut } from "../dto/JobOfferIdDto";
import { UpdateJobOfferComplaintDtoIn } from "../dto/updateJobOfferComplaintDto";

Injectable()
export class mappersComplaint{

   public convertDtoToDomainCreate(domainComplaint: CreateJobOfferComplaintDtoIn)/*:JobOfferComplaint*/  {
      const id = JobOfferComplaintId.create(new UniqueId().getId());
      const issue = JobOfferComplaintIssue.create(domainComplaint.issueDto);
      const date = JobOfferComplaintDate.create( new Date());
      const complaint = JobOfferComplaint.create(id, issue, date);
      
      return (complaint);
     }

     public convertDtoToDomainAccept(domainComplaint: UpdateJobOfferComplaintDtoIn, idComplaint: ComplaintIdDtoInOut)  {
      const id = JobOfferComplaintId.create(idComplaint.id);
      const issue = JobOfferComplaintIssue.create(domainComplaint.issue);
      const date = JobOfferComplaintDate.create(domainComplaint.dateComplaint);
      if (domainComplaint.acceptedOrRejected == null || domainComplaint.acceptedOrRejected == false ){
      const acceptedOrRejected= domainComplaint.acceptedOrRejected;
      const complaint = new JobOfferComplaint(
         id,
         issue,
         date,
         acceptedOrRejected, 
      )
      return JobOfferComplaint.acceptedComplaint(id,complaint)

      }
     }

     public convertDtoToDomainReject(domainComplaint: UpdateJobOfferComplaintDtoIn, idComplaint: ComplaintIdDtoInOut)  {
      const id = JobOfferComplaintId.create(idComplaint.id);
      const issue = JobOfferComplaintIssue.create(domainComplaint.issue);
      const date = JobOfferComplaintDate.create(domainComplaint.dateComplaint);
      if (domainComplaint.acceptedOrRejected == null || domainComplaint.acceptedOrRejected == false ){
      const acceptedOrRejected= domainComplaint.acceptedOrRejected;
      const complaint = new JobOfferComplaint(
         id,
         issue,
         date,
         acceptedOrRejected, 
      )
      return JobOfferComplaint.rejectedComplaint(id,complaint)

      }
     }

     public convertDtoToDomainCreateJobOffferid(idJobOffer: JobOfferIdDtoInOut):JobOfferId {
      const idOffer = JobOfferId.create(idJobOffer.id)
      return idOffer;
     }



   public convertDomainToDtoCreateJobOffferid(idJobOffer: JobOfferId):JobOfferIdDtoInOut {
      const idOfferSC = new JobOfferIdDtoInOut (
         idJobOffer.getId()
      )
      return idOfferSC;
     }

     public convertDomainToDto(domainComplaint: JobOfferComplaint):CreateJobOfferComplaintDtoOut {
      const ComplaintDto = new CreateJobOfferComplaintDtoOut(
         domainComplaint.getId().getId(),
         domainComplaint.getissue().getId(),
         domainComplaint.getdateComplaint().getDate(),
         domainComplaint.getAcceptedOrRejected(),
      )
      
      return ComplaintDto
     }
}