import { IValueObject } from "../../../../shared/domain/IValueObject";
import EmployeerEmptyCompanyMailException from "../../exceptions/employeer/EmployeerEmptyCompanyMailException";
import EmployeerInvalidCompanyMailException from "../../exceptions/employeer/EmployeerInvalidCompanyMailException";

const REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export default class EmployeerCompanyMail implements IValueObject {
    constructor(private readonly email:string ) {}

    public equals(valueObject: EmployeerCompanyMail): boolean {
        return this.email === valueObject.getEmail();
    }

    public getEmail(){
        return this.email;
    }

    public static create(email:string){
        if(email == undefined || email == null){
            throw new EmployeerEmptyCompanyMailException(
                'El email del empleador no puede estar vacio'
            );
        }

        if(!email.match(REGEX)){
            throw new EmployeerInvalidCompanyMailException(
                'El formato no coincide con un email'
            );
        }

        return new EmployeerCompanyMail(email);

    }
}