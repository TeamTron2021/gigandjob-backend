import { IValueObject } from '../../../../shared/domain/IValueObject';
import EmptyEmployeerIdException from '../../exceptions/employeer/EmptyIdEmployeerException';

export default class EmployeerId implements IValueObject {
    private constructor(readonly id: string) {}

    public equals(valueObject: EmployeerId): boolean {
        return this.id === valueObject.id;
    }

    public getId() {
        return this.id;
    }
    
    public static create(id: string) {
        if(id == undefined || id == null || !id.trim()){
            throw new EmptyEmployeerIdException (
                'El id del empleador no puede estar vacio'
            );
        }

        return new EmployeerId(id);
    }

}