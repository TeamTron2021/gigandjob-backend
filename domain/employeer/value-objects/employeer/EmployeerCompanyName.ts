import { IValueObject } from "../../../../shared/domain/IValueObject";
import EmployeerEmptyCompanyNameException from "../../exceptions/employeer/EmployeerEmptyCompanyNameException";
import EmployeerInvalidCompanyNameException from "../../exceptions/employeer/EmployeerInvalidCompanyNameException";

export default class EmployeerCompanyName implements IValueObject {
    constructor(private readonly name: string)  {}

    public equals(valueObject: EmployeerCompanyName): boolean {
        return this.name === valueObject.name;
    }

    public getCompanyName(){
        return this.name;
    }
    public static create(name: string) {
        if( name == undefined || name == null || !name.trim()  ){
            throw new EmployeerEmptyCompanyNameException(
                'El nombre de la empresa empleadora no puede estar vacio'
            )
        }
        if(typeof name != "string"){
            throw new EmployeerInvalidCompanyNameException(
                'El nombre de la empresa empleadora tiene que ser string'
            );
        }
        
        return new EmployeerCompanyName(name);
    }
}