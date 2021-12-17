import { IValueObject } from "../../../shared/domain/IValueObject";

export default class EmployeerCompanyName implements IValueObject {
    constructor(readonly name: string)  {}

    public equals(valueObject: EmployeerCompanyName): boolean {
        return this.name === valueObject.name;
    }


}