
import OnlineInterview from "../../../../../domain/job-offer/entities/OnlineInterview";
import InterviewDate from "../../../../../domain/job-offer/value-objects/Interview/interview/InterviewDate";
import InterviewDescription from "../../../../../domain/job-offer/value-objects/Interview/interview/InterviewDescription";
import InterviewId from "../../../../../domain/job-offer/value-objects/Interview/interview/InterviewId";
import InterviewInterviewed from "../../../../../domain/job-offer/value-objects/Interview/interview/InterviewInterviewed";
import InterviewInterviewer from "../../../../../domain/job-offer/value-objects/Interview/interview/InterviewInterviewer";
import InterviewTitle from "../../../../../domain/job-offer/value-objects/Interview/interview/InterviewTitle";
import OnlineInterviewUrlMeeting from "../../../../../domain/job-offer/value-objects/Interview/OnlineInterview/OnlineInterviewUrlMeeting";
import UniqueId from "../../../../../shared/domain/UniqueUUID";


describe('Testing Interview creation', ()=>{
    it('Should return a Interview instance', () =>{
        
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
        const onlineInterview = OnlineInterview.create(
            InterviewTitle.create('Titulo generico de una entrevista'),
            InterviewDescription.create('Descripcion generica de una entrevista de trabajo'), 
            date, 
            interviewed,
            interviewer,
            id,
            OnlineInterviewUrlMeeting.create('Url generica de una entrevista online')
        ); 
        expect(onlineInterview).toBeInstanceOf(OnlineInterview);
    })
})

