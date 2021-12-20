import { IValueObject } from "../../../../shared/domain/IValueObject";

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
    
    }
}