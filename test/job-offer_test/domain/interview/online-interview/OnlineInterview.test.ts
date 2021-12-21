
import OnlineInterview from "../../../../../domain/interview/entities/OnlineInterview";
import InterviewDate from "../../../../../domain/interview/value-objects/interview/InterviewDate";
import InterviewDescription from "../../../../../domain/interview/value-objects/interview/InterviewDescription";
import InterviewId from "../../../../../domain/interview/value-objects/interview/InterviewId";
import InterviewInterviewed from "../../../../../domain/interview/value-objects/interview/InterviewInterviewed";
import InterviewInterviewer from "../../../../../domain/interview/value-objects/interview/InterviewInterviewer";
import InterviewTitle from "../../../../../domain/interview/value-objects/interview/InterviewTitle";
import OnlineInterviewUrlMeeting from "../../../../../domain/interview/value-objects/OnlineInterview/OnlineInterviewUrlMeeting";
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

