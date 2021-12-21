import EmptyInterviewInterviewedException from "../../../domain/interview/exceptions/Interview/InterviewEmptyIdException";
import InterviewInterviewed from "../../../domain/interview/value-objects/interview/InterviewInterviewed";
import UniqueId from "../../../shared/domain/UniqueUUID";


describe('Testing value object InterviewInterviewed', () => {
    it('should throw empty id error', () =>{
        const id = ' '; 
        expect(() => InterviewInterviewed.create(id)).toThrowError(new EmptyInterviewInterviewedException(
            'El id del entrevistado no puede estar vacio'
        ))
    });
    it('should throw empty id error', () =>{
        const id:any = null; 
        expect(() => InterviewInterviewed.create(id)).toThrowError(new EmptyInterviewInterviewedException(
            'El id del entrevistado no puede estar vacio'
        ))
    });
    it('should return a InterviewInterviewed instance',()=>{
        const id = new UniqueId().getId();
        const interviewInterviewed = InterviewInterviewed.create(id)
        const isInterviewInterviewed = interviewInterviewed instanceof InterviewInterviewed; 
        expect(isInterviewInterviewed).toBe(true);
    })

})