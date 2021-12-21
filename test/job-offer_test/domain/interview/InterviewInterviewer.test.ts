import EmptyInterviewInterviewerException from "../../../../domain/interview/exceptions/Interview/InterviewEmptyIdException";
import InterviewInterviewer from "../../../../domain/interview/value-objects/interview/InterviewInterviewer";
import UniqueId from "../../../../shared/domain/UniqueUUID";


describe('Testing value object InterviewInterviewer', () => {
    it('should throw empty id error', () =>{
        const id = ' '; 
        expect(() => InterviewInterviewer.create(id)).toThrowError(new EmptyInterviewInterviewerException(
            'El Id del entrevistador no puede estar vacio'
        ))
    });
    it('should throw empty id error', () =>{
        const id:any = null; 
        expect(() => InterviewInterviewer.create(id)).toThrowError(new EmptyInterviewInterviewerException(
            'El Id del entrevistador no puede estar vacio'
        ))
    });
    it('should return a InterviewInterviewer instance',()=>{
        const id = new UniqueId().getId();
        const interviewInterviewer = InterviewInterviewer.create(id)
        const isInterviewInterviewer = interviewInterviewer instanceof InterviewInterviewer; 
        expect(isInterviewInterviewer).toBe(true);
    })

})