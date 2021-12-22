import InterviewEmptyDescriptionException from "../../../../../domain/interview/exceptions/Interview/InterviewEmptyDescriptionException";
import OnlineInterviewUrlMeeting from "../../../../../domain/interview/value-objects/OnlineInterview/OnlineInterviewUrlMeeting";


describe('Testing value object OnlineInterviewUrlMeeting',() =>{
    it('Should return an empty offerDescriptionError', ()=>{
        expect(()=>OnlineInterviewUrlMeeting.create(' ')).toThrowError(new InterviewEmptyDescriptionException(
            'La Url de la Entrevista no puede estar vacia'
        ))
    });
    it('Should return an empty offerDescriptionError', ()=>{
        expect(()=>OnlineInterviewUrlMeeting.create('')).toThrowError(new InterviewEmptyDescriptionException(
            'La Url de la Entrevista no puede estar vacia'
        ))
    });
    it('Should return an empty offerDescriptionError', ()=>{
        const description:any = null;
        expect(()=>OnlineInterviewUrlMeeting.create(description)).toThrowError(new InterviewEmptyDescriptionException(
            'La Url de la Entrevista no puede estar vacia'
        ))
    });
    it('Should return a OnlineInterviewUrlMeeting instance', () =>{
        const description ='Url generica de una entrevista online'; 
        const onlineinterviewUrlMOnlineInterviewUrlMeeting = OnlineInterviewUrlMeeting.create(description); 
        const isDescription = onlineinterviewUrlMOnlineInterviewUrlMeeting instanceof OnlineInterviewUrlMeeting; 

        expect(isDescription).toBe(true);
    });
})