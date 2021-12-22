import Interview from "../../../../domain/interview/entities/Interview";
import InterviewDate from "../../../../domain/interview/value-objects/interview/InterviewDate";
import InterviewDescription from "../../../../domain/interview/value-objects/interview/InterviewDescription";
import InterviewId from "../../../../domain/interview/value-objects/interview/InterviewId";
import InterviewInterviewed from "../../../../domain/interview/value-objects/interview/InterviewInterviewed";
import InterviewInterviewer from "../../../../domain/interview/value-objects/interview/InterviewInterviewer";
import InterviewTitle from "../../../../domain/interview/value-objects/interview/InterviewTitle";
import UniqueId from "../../../../shared/domain/UniqueUUID";
import {InterviewDataUpdated} from "../../../../domain/interview/domain-events/InterviewDataUpdated.Event"
import { title } from "process";


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
        const interview = Interview.create(
            InterviewTitle.create('Titulo generico de una entrevista'),
            InterviewDescription.create('Descripcion generica de una entrevista de trabajo'), 
            date, 
            interviewed,
            interviewer,
            id
        ); 
        expect(interview).toBeInstanceOf(Interview);
    })
    test('Should update the basic Interview data',() =>{
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
        const interview = Interview.create(
            InterviewTitle.create('Titulo generico de una entrevista'),
            InterviewDescription.create('Descripcion generica de una entrevista de trabajo'), 
            date, 
            interviewed,
            interviewer,
            id
        ); 

		interview.updateData(
		    new InterviewDescription("descripción actualizada de la entrevista"),
            new InterviewTitle("Titulo actualizado de la entrevista")
            )
		const event = new InterviewDataUpdated(
			interview.description,
			interview.title,
		)
		expect(interview.description).toStrictEqual(new InterviewDescription("descripción actualizada de la entrevista"))
		expect(interview.title).toStrictEqual(new InterviewTitle("Titulo actualizado de la entrevista"))
		expect(interview.getEvents()).toContainEqual(event)
	})
})

