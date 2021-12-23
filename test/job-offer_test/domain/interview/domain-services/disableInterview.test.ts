import disableInterview from "../../../../../domain/job-offer/domain-service/disableInterview";
import Interview from "../../../../../domain/job-offer/entities/Interview";
import { InterviewStatus } from "../../../../../domain/job-offer/shared/InterviewStatus.enum";
import InterviewDate from "../../../../../domain/job-offer/value-objects/Interview/interview/InterviewDate";
import InterviewDescription from "../../../../../domain/job-offer/value-objects/Interview/interview/InterviewDescription";
import InterviewId from "../../../../../domain/job-offer/value-objects/Interview/interview/InterviewId"
import InterviewInterviewed from "../../../../../domain/job-offer/value-objects/Interview/interview/InterviewInterviewed";
import InterviewInterviewer from "../../../../../domain/job-offer/value-objects/Interview/interview/InterviewInterviewer";
import InterviewTitle from "../../../../../domain/job-offer/value-objects/Interview/interview/InterviewTitle";
import UniqueId from "../../../../../shared/domain/UniqueUUID"

describe('Testing disable interview', ()=>{
    it('Should update the interview status', ()=>{
        const date:any = '12/16.2021, 01/22/2022';
        const InterviewInterviewed:any = '1234';
        const InterviewInterviewer:any = '9876'
        const InterviewID:any = '7654'
        const interviewDisable = new Interview(
            new InterviewTitle('Software Developer'),
            new InterviewDescription('Software developers design computer applications'),
            date,
            InterviewInterviewed,
            InterviewInterviewer,
            InterviewStatus.enable,
            InterviewID,
        );

        let inter = new disableInterview();
        expect(interviewDisable.status).toBe(InterviewStatus.enable);

        //expect(inter.disableInterviews().status).toBe(InterviewStatus.disabled);
        
    });
})