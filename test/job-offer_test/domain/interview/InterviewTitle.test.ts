import InterviewEmptyTitleException from "../../../../domain/interview/exceptions/Interview/InterviewEmptyTitleException";
import InterviewTitle from "../../../../domain/interview/value-objects/interview/InterviewTitle";

describe('Value Object InterviewTitle', () =>{
    it('Should return an error ,  title empty', () =>{
        const title = ''; 
        expect(() => InterviewTitle.create(title)).toThrow(new InterviewEmptyTitleException('El titulo de la entrevista no puede estar vacio'));
    })
    it('Should create a title for the offer',()=>{
        const title = 'Entrevista generica'; 
        const interviewTitle = InterviewTitle.create(title);
        const isTitle = interviewTitle instanceof InterviewTitle;
        expect(isTitle).toBe(true);
    })
})