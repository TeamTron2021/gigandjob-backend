import InPersonInterview from "../../../../../domain/interview/entities/InPersonInterview";
import InPersonInterviewDirection from "../../../../../domain/interview/value-objects/InPersonInterview/InPersonInterviewDirection";
import InterviewDate from "../../../../../domain/interview/value-objects/interview/InterviewDate";
import InterviewDescription from "../../../../../domain/interview/value-objects/interview/InterviewDescription";
import InterviewId from "../../../../../domain/interview/value-objects/interview/InterviewId";
import InterviewInterviewed from "../../../../../domain/interview/value-objects/interview/InterviewInterviewed";
import InterviewInterviewer from "../../../../../domain/interview/value-objects/interview/InterviewInterviewer";
import InterviewTitle from "../../../../../domain/interview/value-objects/interview/InterviewTitle";
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
        const interview = InPersonInterview.create(
            InterviewTitle.create('Titulo generico de una entrevista'),
            InterviewDescription.create('Descripcion generica de una entrevista de trabajo'), 
            date, 
            interviewed,
            interviewer,
            id,
            InPersonInterviewDirection.create('Direccion generica de una entrevista presencial')
        ); 
        expect(interview).toBeInstanceOf(InPersonInterview);
    })
})

