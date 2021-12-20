import { IValueObject } from "../../../../shared/domain/IValueObject";
import EmployeerEmptyRifException from "../../exceptions/employeer/EmployeerEmptyRifException";
import EmployeerInvalidRifException from "../../exceptions/employeer/EmployeerInvalidRifException";

const REGEX = /[J]-\d{6,9}-\d{1}\d?/ig

export default class EmployeerRif implements IValueObject {
    constructor(private readonly rif: string){}

    public equals(valueObject: EmployeerRif): boolean {
        return this.rif === valueObject.getRif();
    }

    public getRif():string {
        return this.rif;
    }

    public static create(rif:string){
        if(rif == null || rif == undefined ){
            throw new EmployeerEmptyRifException(
                'El rif no puede estar vacio'
            ); 
        }
        if(typeof rif != "string" || !rif.match(REGEX)){
            throw new EmployeerInvalidRifException(
                'El rif introducido no es valido'
            );
        }

        return new EmployeerRif(rif);
    
    }
}