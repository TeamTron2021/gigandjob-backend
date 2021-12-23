import InterviewCreated from "../../../../../domain/job-offer/domain-events/interview/interview/interviewCreated/InterviewCreated.Event";
import { InterviewRejected } from "../../../../../domain/job-offer/domain-events/interview/InterviewRejected.Event";
import Interview from "../../../../../domain/job-offer/entities/Interview";
import InterviewCurrentlyDisabledException from "../../../../../domain/job-offer/exceptions/Interview/ChangeInterviewStatus/InterviewCurrentlyDisabledException";
import { InterviewStatus } from "../../../../../domain/job-offer/shared/InterviewStatus.enum";
import InterviewDate from "../../../../../domain/job-offer/value-objects/Interview/interview/InterviewDate";
import InterviewDescription from "../../../../../domain/job-offer/value-objects/Interview/interview/InterviewDescription";
import InterviewId from "../../../../../domain/job-offer/value-objects/Interview/interview/InterviewId";
import InterviewInterviewed from "../../../../../domain/job-offer/value-objects/Interview/interview/InterviewInterviewed";
import InterviewInterviewer from "../../../../../domain/job-offer/value-objects/Interview/interview/InterviewInterviewer";
import InterviewTitle from "../../../../../domain/job-offer/value-objects/Interview/interview/InterviewTitle";
import UniqueId from "../../../../../shared/domain/UniqueUUID";

describe('Testing Interview creation', ()=>{
   
    it('Should update the interview status to rejected', ()=>{
        const initialDate = new Date(); 
        const finalDate = new Date(); 
        initialDate.setDate(finalDate.getDate() -1);
        const date = InterviewDate.create(
            initialDate, 
            finalDate
        );
        const id = InterviewId.create(new UniqueId().getId());
        const interviewed = InterviewInterviewed.create(new UniqueId().getId());
        const interviewer = InterviewInterviewer.create(new UniqueId().getId());
        const interviewTitle = InterviewTitle.create('Titulo generico de una entrevista');
        const interviewDescription = InterviewDescription.create('Descripcion generica de una entrevista de trabajo');
        const interview = new Interview(
            interviewTitle,
            interviewDescription,
            date,
            interviewed,
            interviewer,
            InterviewStatus.rejected,  
              id,
        ); 

        expect(interview.status).toBe(InterviewStatus.rejected);

        expect(interview.rejectedInterview().status).toBe(InterviewStatus.rejected);

       
    });
  
})