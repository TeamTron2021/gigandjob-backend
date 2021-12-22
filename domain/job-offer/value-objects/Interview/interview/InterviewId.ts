
import { IValueObject } from '../../../../../shared/domain/IValueObject';
import EmptyInterviewIdException from '../../../exceptions/Interview/Interview/InterviewEmptyIdException';

export default class InterviewId implements IValueObject {
    private constructor(readonly id: string) {}

    public equals(valueObject: InterviewId): boolean {
        return this.id === valueObject.getId();
    }

    public getId() {
        return this.id;
    }
    
    public static create(id: string) {
        if(id === '' || id === ' ' || id == undefined || id == null){
            throw new EmptyInterviewIdException(
                'El id de la entrevista no puede estar vacio'
            );
        }

        return new InterviewId(id);
    }

}