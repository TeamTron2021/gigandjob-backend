import { IValueObject } from "../../../../shared/domain/IValueObject";
import JobOfferInvalidSalaryException from "../../exceptions/JobOffer/JobOfferInvalidSalaryException";
import JobOfferLowSalaryException from "../../exceptions/JobOffer/JobOfferLowSalaryException";

export default class JobOfferSalary implements IValueObject{
    private constructor(private readonly salary:number) {}

    public equals(valueObject: JobOfferSalary): boolean {
        return this.salary === valueObject.getSalary();
    }

    public static create(salary:number) {
        if(salary <= 0) {
            throw new JobOfferLowSalaryException('El salario tiene que ser mayor que 0');
        }
        if(salary == undefined){
            throw new JobOfferInvalidSalaryException('El salario no puede estar vacio');
        }
        if(salary == null) {
            throw new JobOfferInvalidSalaryException('El salario no puede estar vacio');
           
        }
        return new JobOfferSalary(salary);
    }

    public getSalary(){
        return this.salary;
    }
}