
import { IValueObject } from '../../../../../shared/domain/IValueObject';
import EmptyInterviewParticipantException from '../../../exceptions/Interview/Interview/InterviewEmptyParticipantException';

export default class InterviewParticipant implements IValueObject {
    private constructor(readonly participant: string) {}

    public equals(valueObject: InterviewParticipant): boolean {
        return this.participant === valueObject.getparticipant();
    }

    public getparticipant() {
        return this.participant;
    }
    
    public static create(participant: string) {
        if(participant === '' || participant === ' ' || participant == undefined || participant == null){
            throw new EmptyInterviewParticipantException(
                'El participant del empleador no puede estar vacio'
            );
        }

        return new InterviewParticipant(participant);
    }

}