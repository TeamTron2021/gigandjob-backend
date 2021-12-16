import EmptyEmployeerException from '../exceptions/EmptyIdEmployeerException';
import { IValueObject } from './IValueObject';

export default class EmployeerId implements IValueObject {
    private constructor(readonly id: string) {}

    public equals(valueObject: EmployeerId): boolean {
        return this.id === valueObject.id;
    }

    public getId() {
        return this.id;
    }
    
    public static create(id: string) {
        if(id === '' || id === ' ' || id == undefined || id == null){
            throw new EmptyEmployeerException(
                'El id del empleador no puede estar vacio'
            );
        }

        return new EmployeerId(id);
    }

}