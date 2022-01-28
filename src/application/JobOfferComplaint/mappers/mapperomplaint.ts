import { Injectable } from "@nestjs/common";
import { JobOfferComplaint } from "src/domain/job-offer/entities/JobOfferComplaint";
import JobOfferComplaintId from "src/domain/job-offer/value-objects/JobOfferComplaint/JobOfferComplaitId";
import JobOfferComplaintDate from "src/domain/job-offer/value-objects/JobOfferComplaint/JobOfferDateComplaint";
import JobOfferComplaintIssue from "src/domain/job-offer/value-objects/JobOfferComplaint/JobOfferIssueComplaint";
import UniqueId from "src/shared/domain/UniqueUUID";
import { CreateJobOfferComplaintDtoIn } from "../dto/createJobOfferComplaintDto";
import { CreateJobOfferComplaintDtoOut } from "../dto/createJonOfferComplaintWriteDto";

Injectable()
export class mappersComplaint{

   public converttoJobofferComplaintDomain(domainComplaint: CreateJobOfferComplaintDtoIn):JobOfferComplaint {
      const id = JobOfferComplaintId.create(new UniqueId().getId());
      const issue = JobOfferComplaintIssue.create(domainComplaint.issueDto);
      const date = JobOfferComplaintDate.create(domainComplaint.dateComplaintDto);
      const complaint = JobOfferComplaint.create(id, issue, date);
       
      return complaint;
     }

   public converttoJobofferComplaintDto(domainComplaint: JobOfferComplaint):CreateJobOfferComplaintDtoOut {
    const ComplaintDto = new CreateJobOfferComplaintDtoOut(
       domainComplaint.getId().getId(),
       domainComplaint.getissue().getId(),
       domainComplaint.getdateComplaint().getDate(),
       domainComplaint.getAcceptedOrRejected()
    )
    
    return ComplaintDto
   }

}