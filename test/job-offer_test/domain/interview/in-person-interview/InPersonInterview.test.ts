import InPersonInterview from "../../../../../domain/job-offer/entities/InPersonInterview";
import InPersonInterviewDirection from "../../../../../domain/job-offer/value-objects/Interview/InPersonInterview/InPersonInterviewDirection";
import InterviewDate from "../../../../../domain/job-offer/value-objects/Interview/interview/InterviewDate";
import InterviewDescription from "../../../../../domain/job-offer/value-objects/Interview/interview/InterviewDescription";
import InterviewId from "../../../../../domain/job-offer/value-objects/Interview/interview/InterviewId";
import InterviewInterviewed from "../../../../../domain/job-offer/value-objects/Interview/interview/InterviewInterviewed";
import InterviewInterviewer from "../../../../../domain/job-offer/value-objects/Interview/interview/InterviewInterviewer";
import InterviewTitle from "../../../../../domain/job-offer/value-objects/Interview/interview/InterviewTitle";
import UniqueId from "../../../../../shared/domain/UniqueUUID";
import {InterviewStatus} from "../../../../../domain/job-offer/shared/InterviewStatus.enum";

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
const interviewTitle = InterviewTitle.create('Titulo genérico de una entrevista');
const interviewDescription = InterviewDescription.create('Descripción genérica de una entrevista de trabajo');
const interviewDirection = InPersonInterviewDirection.create('Dirección genérica de una entrevista presencial');

describe('Testing Interview creation', ()=>{
    it('Should return a Interview instance', () =>{
        const interview = InPersonInterview.create(
            interviewTitle,
            interviewDescription,
            date, 
            interviewed,
            interviewer,
            id,
            interviewDirection
        ); 
        expect(interview).toBeInstanceOf(InPersonInterview);
    });
    
    test('Should throws an interview currently disabled error', () => {
        const interview = new InPersonInterview(
            interviewTitle,
            interviewDescription,
            date,
            interviewed,
            interviewer,
            InterviewStatus.disabled,
            id,
            interviewDirection
        );
        
        expect(() => {interview.acceptInterview()}).toThrow();
    });
    
    test('Should change the interview status from "created" to "accepted', () => {
        const interview = InPersonInterview.create(
            interviewTitle,
            interviewDescription,
            date,
            interviewed,
            interviewer,
            id,
            interviewDirection
        );
        interview.acceptInterview();
        const newInterviewStatus = interview.status;
        const expectedInterviewStatus = InterviewStatus.accepted;
        
        expect(newInterviewStatus).toBe(expectedInterviewStatus);
    })

    test('Should throws an interview currently disabled error',()=>{
        const interview = new InPersonInterview(
            interviewTitle,
            interviewDescription,
            date,
            interviewed,
            interviewer,
            InterviewStatus.disabled,
            id,
            interviewDirection
        ); 
            
            expect(() => {interview.rejectInterview()}).toThrow();
    });

    test('Should update the interview status to rejected', ()=>{
       
        const interview =  InPersonInterview.create(
            interviewTitle,
            interviewDescription,
            date,
            interviewed,
            interviewer,
            id,
            interviewDirection
        ); 
            interview.rejectInterview();
            const interviewStatus = interview.status;
            const statusExpected = InterviewStatus.rejected;
            
        expect(interviewStatus).toBe(statusExpected);
    
    });
})

